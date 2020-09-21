import { Component, OnInit, Inject } from '@angular/core';
import { CandidateService } from 'src/app/Core/Services/candidate.service';
import { AssignPracticalService } from 'src/app/Core/Services/assign-practical.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { PracticalModel } from 'src/app/Core/Models/practicalModel';
import { AssignMachineComponent } from '../../Practical/assign-machine/assign-machine.component';
import { ConfirmDeleteService } from 'src/app/Shared/Services/confirm-delete.service';

@Component({
  selector: 'app-assign-practical',
  templateUrl: './assign-practical.component.html',
  styleUrls: ['./assign-practical.component.css']
})
export class AssignPracticalComponent implements OnInit {
  candidateId: number = null;
  candidateExp: number = null;
  candidateTech: string = null;
  public popoverTitle: string = 'Confirm';
  public popoverMessage: string = 'Are you sure you want to assign this Practical';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public practicalList: PracticalModel[];

  constructor(private CandidateService: CandidateService,
    private AssignPracticalService: AssignPracticalService,
    public dialogRef: MatDialogRef<AssignPracticalComponent>,
    private confirmDeleteService: ConfirmDeleteService,
    public matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.candidateId = data.candidateId;
    this.candidateExp = data.experience;
    this.candidateTech = data.technology;
  }

  ngOnInit() {
    this.getPracticalToAssign(this.candidateId, this.candidateExp, this.candidateTech);
  }

  onAssignPractical(practical) {
    this.confirmDeleteService.openConfirmDialog("Are you sure you want to assign this Practical?")
      .afterClosed().subscribe(res => {
        if (res) {
          const dialogAssignMachine = new MatDialogConfig();
          dialogAssignMachine.disableClose = true;
          dialogAssignMachine.id = "assign-machine";
          dialogAssignMachine.height = "auto";
          dialogAssignMachine.width = "650px";
          dialogAssignMachine.data = {
            candidateId: this.candidateId,
            practicalId: practical.practicalId
          }
          this.closeDialog();
          const modalPracDialog = this.matDialog.open(AssignMachineComponent, dialogAssignMachine);
        }
      }) 
  }

  getPracticalToAssign(canId, exp, tech) {
    this.AssignPracticalService.getPracticalToAssign(canId, exp, tech).subscribe(
      (data: PracticalModel[]) => {
        this.practicalList = data;
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
