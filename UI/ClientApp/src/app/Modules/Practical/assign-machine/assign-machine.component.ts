import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PracticalModel } from 'src/app/Core/Models/practicalModel';
import { isNullOrUndefined } from 'util';
import { PracticalService } from '../../../Core/Services/practical.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MachineModel } from 'src/app/Core/Models/machineModel';
import { MachineService } from 'src/app/Core/Services/machine.service';
import { ConfirmDeleteService } from 'src/app/Shared/Services/confirm-delete.service';
import saveAs from 'file-saver';
import * as CryptoJS from 'crypto-js';
import { SelectedMachineDetailModel } from 'src/app/Core/Models/selectedMachineDetailModel';
import { AutoDownloadDetailsModel } from 'src/app/Core/Models/autoDownloadDetailsModel';

declare var require: any
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-assign-machine',
  templateUrl: './assign-machine.component.html',
  styleUrls: ['./assign-machine.component.css']
})
export class AssignMachineComponent implements OnInit {
  public userId = localStorage.getItem('userId');
  practicalDetail: PracticalModel;
  practicalId: number = null;
  candidateId: number = null;
  title: string;
  assignMachine: FormGroup;
  submitted = false;
  errorMessage: any;
  machineDetails: MachineModel[];
  autoDownloadDetails: AutoDownloadDetailsModel;

  constructor(
    public dialogRef: MatDialogRef<AssignMachineComponent>,
    private formBuilder: FormBuilder,
    private GlobalService: GlobalService,
    public matDialog: MatDialog,
    private router: Router,
    private PracticalService: PracticalService,
    private MachineService: MachineService,
    private confirmDeleteService: ConfirmDeleteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.practicalId = !isNullOrUndefined(data.practicalId) ? data.practicalId : null;
    this.candidateId = !isNullOrUndefined(data.candidateId) ? data.candidateId : null;

    this.getPractical();
    this.getMachineDetails();

    this.assignMachine = this.formBuilder.group({
      MachineName: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  get validationCheck() { return this.assignMachine.controls; }

  selectMachine(machine) {
    this.confirmDeleteService.openConfirmDialogTwo("Are you sure you want to select " + machine.machineName)
      .afterClosed().subscribe(res => {
        if (res) {
          this.PracticalService.assignMachine(this.practicalId, this.candidateId, machine.machineId, this.userId)
            .subscribe((data: SelectedMachineDetailModel) => {
            
              if (data[0].practicalDocName != "") {
                let fileName = this.Decrypt(data[0].practicalDocName);
                data[0].actualPracticalDocName = fileName;
              }

              if (data[0].refDocName != "") {
                let fileName = this.Decrypt(data[0].refDocName);
                data[0].actualRefDocName = fileName;
              }

              this.PracticalService.AutoDownload(data)
                .subscribe((data: any) => {

                })

                //let fileName = data[0].directoryPath + "\\" + data[0].practicalDocName;
                //this.PracticalService.DownloadFile(data[0].practicalDocName, "1")
                //  .subscribe(
                //    success => {
                //      saveAs(success, data[0].practicalDocName);
                //    },
                //    err => {
                //      alert("Server error while downloading file.");
                //    }
                //  );
              
              //if (data[0].refDocName != "") {
              //  let fileName = this.Decrypt(data[0].refDocName);

                //let fileName = data[0].directoryPath +"\\" + data[0].refDocName
                //this.PracticalService.DownloadFile(data[0].refDocName, "1")
                //  .subscribe(
                //    success => {
                //      saveAs(success, data[0].refDocName);
                //    },
                //    err => {
                //      alert("Server error while downloading file.");
                //    }
                //  );
              //}
              window.location.reload();
              this.router.navigate(['/candidate']);

            }, error => this.errorMessage = error)
        }
        this.closeDialog();
      })
  }

  private SecretKey: string = '!@TatvaSoftCRM@!';  // length of secret ket will be 16.
  private initVector: string = '!@TatvaSoftCRM@!';

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

  getMachineDetails() {
    this.MachineService.getInactiveMachine().subscribe(
      (data: MachineModel[]) => {
        this.machineDetails = data;
      })
  }

  getPractical() {
    this.PracticalService.getPracticalById(this.practicalId).subscribe(
      (data: PracticalModel[]) => {
        this.practicalDetail = data[0];
        this.title = this.practicalDetail.practicalName;
      })
  }

  save() {
    this.submitted = true;

    if (this.assignMachine.invalid) {
      return;
    }

    var message: string = '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
