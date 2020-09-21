import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MachineModel } from 'src/app/Core/Models/machineModel';
import { MachineService } from 'src/app/Core/Services/machine.service';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { OrderPipe } from 'ngx-order-pipe';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { AddEditMachineComponent } from '../add-edit-machine/add-edit-machine.component';
import { ConfirmDeleteComponent } from 'src/app/Shared/Modules/confirm-delete/confirm-delete.component';
import { ConfirmDeleteService } from 'src/app/Shared/Services/confirm-delete.service';


@Component({
  selector: 'app-machine-info',
  templateUrl: './machine-info.component.html',
  styleUrls: ['./machine-info.component.css']
})
export class MachineInfoComponent implements OnInit {
  public machineList: MachineModel[];
  public pageNumber: number = 1;
  public perPageitems: number = 10;

  public items = this.GlobalService.displayItemsPerPage;
  searchText: string;
  sortedCollection: any[];

  order: string = 'machineName';
  reverse: boolean = false;

  constructor(private MachineService: MachineService,
    private GlobalService: GlobalService,
    private orderPipe: OrderPipe,
    private http: HttpClient,
    private confirmDeleteService: ConfirmDeleteService,
    public matDialog: MatDialog) {
    this.sortedCollection = orderPipe.transform(this.machineList, 'machineName');
    console.log(this.sortedCollection);
  }

  ngOnInit() {
    this.getMachines();
  }

  getMachines() {
    this.MachineService.getMachines().subscribe(
      (data: MachineModel[]) => {
        this.machineList = data;
      }
    )
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  onAddEditMachine(machineInfo) {
    const dialogPracConfig = new MatDialogConfig();
    dialogPracConfig.disableClose = true;
    dialogPracConfig.id = "modal-component";
    dialogPracConfig.height = "auto";
    dialogPracConfig.width = "650px";
    dialogPracConfig.data = machineInfo ? machineInfo.machineId : null;
    const modalPracDialog = this.matDialog.open(AddEditMachineComponent, dialogPracConfig);
  }

  closeModal() {
    this.matDialog.closeAll();
  }

  pageChange($event) {
    debugger;
  }

  deleteItem(machine) {
    if (!machine.isactive) {
      this.confirmDeleteService.openConfirmDialog("Are you sure you want to delete this record?")
        .afterClosed().subscribe(res => {
          if (res) {
            this.MachineService.deleteMachineDetails(machine.machineId).subscribe(
              (data) => {
                window.location.reload();
              })
          }
        })
    }
  }

}
