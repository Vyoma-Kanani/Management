import { Component, OnInit, ViewChild } from '@angular/core';
import { PracticalModel } from 'src/app/Core/Models/practicalModel';
import { PracticalService } from 'src/app/Core/Services/practical.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddEditPracticalComponent } from '../add-edit-practical/add-edit-practical.component'
import { practicalCategory } from '../../../Shared/Model/app_enum'
import { DatasourceService } from 'src/app/Shared/Services/datasource.service';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { OrderPipe } from 'ngx-order-pipe';
import { ConfirmDeleteService } from 'src/app/Shared/Services/confirm-delete.service';

declare var $;

@Component({
  selector: 'app-practical-info',
  templateUrl: './practical-info.component.html',
  styleUrls: ['./practical-info.component.css']
})
export class PracticalInfoComponent implements OnInit {
  public practicalList: PracticalModel[];
  public pageNumber: number = 1;
  public perPageitems: number = 10;

  public items = this.GlobalService.displayItemsPerPage;
  searchText: string;

  order: string = 'practicalName';
  reverse: boolean = false;

  public popoverTitle: string = 'Confirm';
  public popoverMessage: string = 'Are you sure you want to delete this Practical';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(private PracticalService: PracticalService,
    private dataService: DatasourceService,
    private GlobalService: GlobalService,
    private orderPipe: OrderPipe,
    private confirmDeleteService: ConfirmDeleteService,
    private http: HttpClient,
    public matDialog: MatDialog) {
    this.sortedCollection = orderPipe.transform(this.practicalList, 'practicalName');
    console.log(this.sortedCollection);
  }
  //dtOptions: DataTables.Settings = {};
  //@ViewChild('dataTable', { static: true }) table;
  //dataTable: any;

  ngOnInit() {
    //this.dataTable = $(this.table.nativeElement);
    //this.dataTable.dataTable();
    //this.dtOptions = {
    //  pagingType: 'full_numbers',
    //  pageLength: 5,
    //  processing: true
    //};
    //this.getDataFromSource();
    this.getPractical();
  }

  getPractical() {
    this.PracticalService.getPractical().subscribe(
      (data: PracticalModel[]) => {
        this.practicalList = data;
        console.log(data);
      }
    )
  }
  //--------------------------DataTable--------------

  //dataTable: any;
  //dtOptions: any;
  //tableData: any = [];
  //@ViewChild('dataTable', { static: true }) table;

  //getPractical() {
  //  debugger;
  //  this.PracticalService.getPractical().subscribe(
  //    data => {
  //      this.tableData = data;
  //      this.dtOptions = {
  //        data: this.tableData,
  //        columns: [
  //          { title: 'Name', data: 'practicalName' },
  //          { title: 'Defination', data: 'defination' },
  //          { title: 'Technology', data: 'technology' },
  //          { title: 'Category', data: 'category' },
  //          { title: 'Experience_LB', data: 'experienceLb' },
  //          { title: 'Experience_UB', data: 'experienceUb' },
  //          {
  //            title: 'Action', "render": function () {
  //              return '<button (click)="onAddEditPractical(prac)" class="btn action">' +
  //                '<span id = "actionStyle" class="fa fa-edit" > </span>' +
  //                '</button>' +
  //                '<span class="btn action" id = "onselectStyle" >' +
  //                '<span class="fa fa-times" id = "actionStyle" > </span>' +
  //                '</span>'
  //            }
  //          }
  //        ]
  //      };
  //    }, err => { }, () => {
  //      this.dataTable = $(this.table.nativeElement);
  //      this.dataTable.DataTable(this.dtOptions);
  //    });
  //}
  sortedCollection: any[];

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  //---------------------------------


  onAddEditPractical(practicalInfo) {
    const dialogPracConfig = new MatDialogConfig();
    dialogPracConfig.disableClose = true;
    dialogPracConfig.id = "modal-component";
    dialogPracConfig.height = "600px";
    dialogPracConfig.width = "650px";
    dialogPracConfig.data = practicalInfo ? practicalInfo.practicalId : null;
    const modalPracDialog = this.matDialog.open(AddEditPracticalComponent, dialogPracConfig);
  }

  closeModal() {
    this.matDialog.closeAll();
  }

  pageChange($event) {
    debugger;
  }

  ondelete(practical) {
    this.confirmDeleteService.openConfirmDialog("Are you sure you want to delete this record?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.PracticalService.deletePracDetails(practical.practicalId).subscribe(
            (data) => {
              window.location.reload();
            })
        }
        })
    //if (this.confirmClicked == true) {
    //  this.PracticalService.deletePracDetails(practical.practicalId).subscribe(
    //    (data) => {
    //      window.location.reload();
    //    }
    //  )
    //}
  }

  //--------------------------DataTable--------------
  //dataTable: any;
  //dtOptions: any;
  //tableData = [];
  //@ViewChild('dataTable', { static: true }) table;

  //getDataFromSource() {
  //  this.dataService.getData().subscribe(data => {
  //    this.tableData = data.data;
  //    this.dtOptions = {
  //      data: this.tableData,
  //      //columns: [
  //      //  { title: 'Name', data: 'Name' },
  //      //  { title: 'Defination', data: 'Defination' },
  //      //  { title: 'Technology', data: 'Technology' },
  //      //  { title: 'Category', data: 'Category' },
  //      //  { title: 'Experience_LB', data: 'Experience_LB' },
  //      //  { title: 'Experience_UB', data: 'Experience_UB' },
  //      //  { title: 'Action', data: 'Action' },

  //      //]
  //    };
  //  }, err => { }, () => {
  //    this.dataTable = $(this.table.nativeElement);
  //    this.dataTable.DataTable(this.dtOptions);
  //  });
  //}
  //-------------------------------------------------------------

}
