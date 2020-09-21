import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MachineModel } from 'src/app/Core/Models/machineModel';
import { practicalCategory } from 'src/app/Shared/Model/app_enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { MachineService } from 'src/app/Core/Services/machine.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
//import { verify } from 'crypto';

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
  selector: 'app-add-edit-machine',
  templateUrl: './add-edit-machine.component.html',
  styleUrls: ['./add-edit-machine.component.css']
})
export class AddEditMachineComponent implements OnInit {
  public userId = localStorage.getItem('userId');

  title: string
  addEditMachine: FormGroup
  MachineDetail: MachineModel;
  errorMessage: any;
  submitted = false;
  machineId: number = null;
  floorList = this.GlobalService.floorList;
  floorSelected: any;
  machineIpPattern = "^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$";
  currentIp: string;
  constructor(public dialogRef: MatDialogRef<AddEditMachineComponent>,
    private GlobalService: GlobalService,
    private formBuilder: FormBuilder,
    private MachineService: MachineService,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.machineId = !isNullOrUndefined(data) ? data : null;
    this.addEditMachine = this.formBuilder.group({
      machineName: ['', [Validators.required]],
      machineIP: ['', [Validators.required, Validators.pattern(this.machineIpPattern)]],
      workingDirectoryPath: ['', [Validators.required]],
      floor: ['', [Validators.required]],
      isactive: ['']
    })
  }

  ngOnInit() {
    this.title = this.machineId ? "Edit Machine Details" : "Add Machine";
    if (this.machineId) {
      this.getMachineDetailById();
    }
  }

  get validationCheck() { return this.addEditMachine.controls; }

  verifyIP(event) {
    this.currentIp =  event.target.value;
    this.MachineService.verifyIp(this.currentIp).subscribe(
      (data: boolean) => {
        if (!data) {
          this.addEditMachine.controls['machineIP'].setErrors({ 'incorrect': true });
        }
      }
    )
    console.log(event);
  }

  getMachineDetailById() {
    this.MachineService.getMachineById(this.machineId).subscribe(
      (data: MachineModel[]) => {
        this.MachineDetail = data[0];
        this.setMachineDetails();
      }
    )
  }

  setMachineDetails() {
    this.addEditMachine.get('machineName').patchValue(this.MachineDetail.machineName);
    this.addEditMachine.get('machineIP').patchValue(this.MachineDetail.machineIP);
    this.addEditMachine.get('workingDirectoryPath').patchValue(this.MachineDetail.workingDirectoryPath);
    this.addEditMachine.get('isactive').patchValue(this.MachineDetail.isActive);
    this.floorSelected = this.MachineDetail.floor;
  }
 
  save() {

    this.submitted = true;

    if (this.addEditMachine.invalid) {
      return;
    }

    var message: string = '';

    const formData = new FormData();
    formData.append("machineName", this.addEditMachine.get('machineName').value);
    formData.append("machineIP",this.addEditMachine.get('machineIP').value);
    formData.append("workingDirectoryPath", this.addEditMachine.get('workingDirectoryPath').value);
    formData.append("floor", String(this.addEditMachine.get('floor').value));
    var active = this.addEditMachine.get('isactive').value == true ? '1' : '0';
    formData.append("isactive", active);

    if (this.machineId) {
      this.MachineService.editMachineDetails(formData, this.machineId)
        .subscribe((data) => {
          this.router.navigate(['/machine']);
        }, error => this.errorMessage = error)
    }
    else {
      this.MachineService.addMachine(formData)
        .subscribe((data) => {
          this.router.navigate(['/machine']);
        }, error => this.errorMessage = error)
    }

    this.closeDialog();

    window.location.reload();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
