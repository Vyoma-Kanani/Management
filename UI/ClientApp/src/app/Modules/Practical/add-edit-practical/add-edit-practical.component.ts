import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { GlobalService, } from 'src/app/Shared/Services/global.service';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { PracticalService } from '../../../Core/Services/practical.service';
import { Router } from '@angular/router';
import { practicalCategory } from '../../../Shared/Model/app_enum'
import { ErrorStateMatcher } from '@angular/material/core';
import * as CryptoJS from 'crypto-js';
import saveAs from 'file-saver';
import { downloadFile } from 'file-saver';
import { PracticalModel } from 'src/app/Core/Models/practicalModel';
import { isNullOrUndefined } from 'util';

declare var $: any;

declare var require: any
const FileSaver = require('file-saver');

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-edit-practical',
  templateUrl: './add-edit-practical.component.html',
  styleUrls: ['./add-edit-practical.component.css']
})
export class AddEditPracticalComponent implements OnInit {
  public userId = localStorage.getItem('userId');
  title: string
  addEditPractical: FormGroup
  practicalDetail: PracticalModel;
  public categoryEnum = practicalCategory;
  errorMessage: any;
  submitted = false;
  techList = this.GlobalService.techList;
  practicalId: number = null;
  techselected: any = ['Node Js'];
  public pracDocDetails;
  public refDocDetails;
  public ulrPrac;
  public urlRef;
  practicalcategry = this.GlobalService.category;
  Categoryselected: number;
  public refDocUpload: File = null;
  public practDocUpload: File = null;
  public pracDocName: string = '';
  public refDocName: string = '';

  private SecretKey: string = '!@TatvaSoftCRM@!';  // length of secret ket will be 16.
  private initVector: string = '!@TatvaSoftCRM@!';

  constructor(public dialogRef: MatDialogRef<AddEditPracticalComponent>,
    private GlobalService: GlobalService,
    private formBuilder: FormBuilder,
    private PracticalService: PracticalService,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.practicalId = !isNullOrUndefined(data) ? data : null;
    this.addEditPractical = this.formBuilder.group({
      PracticalName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      defination: ['', [Validators.required]],
      comment: [''],
      PracDocument: [''],
      RefDocument: [''],
      technology: ['', [Validators.required]],
      ExperienceLb: ['', [Validators.required]],
      ExperienceUb: ['', [Validators.required]],
      PracDocumentName: [''],
      RefDocumentName: ['']
    })
  }

  ngOnInit() {
    this.title = this.practicalId ? "Edit Practical" : "Add Practical";

    if (this.practicalId) {
      this.getPractDetailById();
    }

  }

  getPractDetailById() {
    this.PracticalService.getPracticalById(this.practicalId).subscribe(
      (data: PracticalModel[]) => {
        this.practicalDetail = data[0];
        this.setPracticalDetails();
      }
    )
  }

  setPracticalDetails() {
    this.addEditPractical.get('PracticalName').patchValue(this.practicalDetail.practicalName);
    this.addEditPractical.get('defination').patchValue(this.practicalDetail.defination);
    this.addEditPractical.get('comment').patchValue(this.practicalDetail.comment);
    this.addEditPractical.get('ExperienceLb').patchValue(this.practicalDetail.experienceLb);
    this.addEditPractical.get('ExperienceUb').patchValue(this.practicalDetail.experienceUb);
    this.addEditPractical.get('technology').patchValue(this.practicalDetail.technology);
    this.Categoryselected = +(this.practicalDetail.category);
    this.techselected = this.practicalDetail.technology.split(',');
    this.PracDoc(this.practicalDetail.practicalId, 1);
    this.PracDoc(this.practicalDetail.practicalId, 2);
  }

  PracDoc(pracId, fileType) {
    this.PracticalService.getDocumentDetails(pracId, fileType).subscribe(
      (datas) => {
        datas = datas.substring(1, datas.length - 1);
        var file = this.Decrypt(datas);
  
        if (fileType == 1) {
          this.pracDocDetails = datas

          this.ulrPrac = file
        }
        else if (fileType == 2) {
          this.refDocDetails = datas;
          this.urlRef = file
        }
      }
    )
  }

  public Encrypt(value) {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), this.SecretKey, {
      keySize: 16,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      iv: this.initVector
    });

    var base64encrypt = encrypted.toString();
    var e64encrypt = CryptoJS.enc.Base64.parse(base64encrypt);
    var eHaxEncrypt = e64encrypt.toString(CryptoJS.enc.Hex);

    return eHaxEncrypt;
  }

  public Decrypt(cipherText) {
    var base64 = CryptoJS.enc.Hex.parse(cipherText);
    var bytes = base64.toString(CryptoJS.enc.Base64);
    var decrypted = CryptoJS.AES.decrypt(bytes, this.SecretKey, {
      keySize: 16,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      iv: this.initVector
    });
    var plain = decrypted.toString(CryptoJS.enc.Utf8);

    return plain;
  }

  get validationCheck() { return this.addEditPractical.controls; }

  //--------------------------download file -----------------------
  DownLoadFiles(attachmentFileName) {

    let fileName = attachmentFileName;
    let checkFileType = fileName.split('.').pop();
    var fileType;

    let ActualDocName = this.Decrypt(fileName);

    if (checkFileType == "pdf") {
      fileType = "application/pdf";
    }
    if (checkFileType == "doc") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == "docx") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == "xls") {
      fileType = "application/vnd.ms-excel";
    }
    if (checkFileType == "xlsx") {
      fileType = "application/vnd.ms-excel";
    }
    this.PracticalService.DownloadFile(fileName, fileType)
      .subscribe(
      success => {
        saveAs(success, ActualDocName);
        },
        err => {
          alert("Server error while downloading file.");
        }
      );
  }

  //------------------------------------Upload File--------------------
  uploadDoc(event) {
    debugger;
    if (event.target.files && event.target.files[0]) {
      this.practDocUpload = event.target.files.item(0);
      this.pracDocName = this.Encrypt(event.target.files[0].name);

      var decryptedname = this.Decrypt(this.pracDocName);

      console.log(event.target.files[0].name);
      console.log(this.pracDocName);
      console.log(decryptedname);
      //var file_splitted = event.target.files[0].name.split('.');
      //var extension = file_splitted.pop();
      //var key = CryptoJS.enc.Utf8.parse("test");
      //var iv = CryptoJS.enc.Utf8.parse("test");
      //var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(file_splitted[0].trim().toString()), key,
      //  {
      //    keySize: 128 / 8,
      //    iv: iv,
      //    mode: CryptoJS.mode.CBC,
      //    padding: CryptoJS.pad.Pkcs7
      //  });
      //this.pracDocName = encrypted.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
      //this.pracDocName = this.pracDocName.concat('.' + extension);
    }
  }

  upload(event) {
    if (event.target.files && event.target.files[0]) {     
      this.refDocUpload = event.target.files.item(0);
      this.refDocName = this.Encrypt(event.target.files[0].name);

      //var file_splitted = event.target.files[0].name.split('.');

      //var extension = file_splitted.pop();
      //var key = CryptoJS.enc.Utf8.parse("test");
      //var iv = CryptoJS.enc.Utf8.parse("test");
      //var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(file_splitted[0].trim().toString()), key,
      //  {
      //    keySize: 128 / 8,
      //    iv: iv,
      //    mode: CryptoJS.mode.CBC,
      //    padding: CryptoJS.pad.Pkcs7
      //  });
      //this.refDocName = encrypted.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
      //this.refDocName = this.refDocName.concat('.'+extension)
    }
  }

  save() {
    this.submitted = true;

    if (this.addEditPractical.invalid) {
      return;
    }

    var message: string = '';

    const formData = new FormData();
    formData.append("PracticalName", this.addEditPractical.get('PracticalName').value);
    formData.append("defination", this.addEditPractical.get('defination').value);
    formData.append("ExperienceLb", String(this.addEditPractical.get('ExperienceLb').value));
    formData.append("ExperienceUb", String(this.addEditPractical.get('ExperienceUb').value));
    formData.append("Category", String(this.addEditPractical.value.category));
    formData.append('RefDocument', this.refDocUpload);
    formData.append('PracDocument', this.practDocUpload);
    formData.append("comment", this.addEditPractical.get('comment').value);
    formData.append("PracDocumentName", this.pracDocName);
    formData.append("RefDocumentName", this.refDocName)

    this.addEditPractical.value.technology = this.addEditPractical.value.technology.join(",");
    formData.append('technology', this.addEditPractical.value.technology);

    if (this.practicalId) {
      this.PracticalService.editPractical(formData, this.practicalId, this.userId )
        .subscribe((data) => {
          this.router.navigate(['/practical']);
        }, error => this.errorMessage = error)
    }
    else {
      this.PracticalService.addPractical(this.userId, formData)
        .subscribe((data) => {
          this.router.navigate(['/practical']);
        }, error => this.errorMessage = error)
    }
    this.closeDialog();
    window.location.reload();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
