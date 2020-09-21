import { Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../Modules/confirm-delete/confirm-delete.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteService {

  constructor(
    public matDialog: MatDialog,
  ) { }

  openConfirmDialog(msg) {
  return  this.matDialog.open(ConfirmDeleteComponent, {
      id : "assign-machine",
      height: "auto",
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      width :"auto",
      data :{
        message: msg
        //practicalId: practical.practicalId
      }

    })
  }
  openConfirmDialogTwo(msg) {
    return this.matDialog.open(ConfirmDeleteComponent, {
      id: "assure-machine",
      height: "auto",
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      width: "auto",
      data: {
        message: msg
        //practicalId: practical.practicalId
      }

    })
  }
}
