import { Component, OnInit, ViewChild, Input, Injectable } from '@angular/core';
import { CandidateModel } from 'src/app/Core/Models/candidateModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { CandidateService } from '../../../Core/Services/candidate.service';
import { TabContentComponent } from 'src/app/Shared/Modules/tab-content/tab-content.component';
import { GlobalService, practicalStatusEnum } from '../../../Shared/Services/global.service'
import { AssignPracticalComponent } from '../assign-practical/assign-practical.component';
import { AssignPracticalService } from '../../../Core/Services/assign-practical.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignalRService } from 'src/app/Shared/Services/signal-r.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isNullOrUndefined } from 'util';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { ConfirmDeleteService } from 'src/app/Shared/Services/confirm-delete.service';
import { filter, pairwise } from 'rxjs/operators';
import { FilterCandidateDataModel } from 'src/app/Core/Models/filterCandidateDataModel';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css']
})
@Injectable()

export class CandidateInfoComponent implements OnInit {
  public candidateList: CandidateModel[];
  dataSource = new MatTableDataSource<CandidateModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() AppComponent: AppComponent;
  @ViewChild('addEditCandidate', { static: true }) addEditCandidateTemplate;
  @ViewChild(TabContentComponent, { static: true }) TabContentComponent;
  @Input() practicalStatusEnum: practicalStatusEnum;
  filterData: FormGroup
  techList = this.GlobalService.techList;
  status = this.GlobalService.status;
  started: string;
  public pageNumber = localStorage.getItem("page")  ? +(localStorage.getItem("page")) : 1;
  public perPageitems: number = 10;
  public items = this.GlobalService.displayItemsPerPage;
  previousFilter: FilterCandidateDataModel;
  filterStatus: any;

  constructor(public matDialog: MatDialog,
    public http: Http,
    private CandidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute,
    private GlobalService: GlobalService,
    private confirmDeleteService: ConfirmDeleteService,
    private SignalRService: SignalRService,
    private AssignPracticalService: AssignPracticalService,
    private formBuilder: FormBuilder,
  ) {
    this.filterData = this.formBuilder.group({
      candidateName: [''],
      technology: [''],
      practicalStatus: [''],
      email: [''],
      mobile: ['']
    })
    //this.notifyOnPracticalComplete();

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.getCandidate();
    //this.notifyOnPracticalComplete();
    //if (localStorage.getItem("filterStatus") != null) {
    //  this.filterStatus = +(localStorage.getItem("filterStatus").split(','))
    //  this.filterData.value.practicalStatus = localStorage.getItem("filterStatus").split(',')
    //  this.search();
    //}
    //if (this.CandidateService.filterDataDetails != null) {
    //  //let num = this.CandidateService.filterDataDetails.practicalStatus.split(',');
    //  this.filterData.get('candidateName').patchValue(this.CandidateService.filterDataDetails.candidateName);
    //  this.filterStatus = +(this.CandidateService.filterDataDetails.practicalStatus.split(','))
    //  this.filterData.value.practicalStatus = this.CandidateService.filterDataDetails.practicalStatus.split(',')
    //  this.search();
    //}

    if (this.CandidateService.tabsOpen != null) {
      this.onAddEditCandidate(this.CandidateService.tabsOpen);
    }
  }

  notifyOnPracticalComplete() {
    var connection = this.SignalRService.getSignalRConnection();
    if (!isNullOrUndefined(connection)) {
      connection.on('taskStarted', data => {
        console.log('task started');
      });
      connection.on('transferdata', data => {
        console.log(data);
        this.started = data;
      });
      connection.on('taskEnded', data => {
        console.log('task ended');
      });
    }
  }

  // -----------------------------------------------------Filter-----------------------------------------
  search() {

    //this.searchText = this.filterData.value.candidateName;
    if (this.filterData.value.practicalStatus != undefined ) {
        this.filterData.value.practicalStatus = this.filterData.value.practicalStatus.join(",");
      }
      this.CandidateService.FilterCandidates(this.filterData.value).subscribe(
        (data: CandidateModel[]) => {
          this.candidateList = data;
          this.CandidateService.filterDataDetails = this.filterData.value;
          localStorage.setItem("filterStatus", this.filterData.value.practicalStatus)
        }
      )
    
    //if (this.filterData.value.technology != '' && this.filterData.value.technology != null && this.filterData.value.technology != undefined) {
    //  this.filterData.value.technology = this.filterData.value.technology.join(",");
    //}
    //else {
    //  this.filterData.value.technology = null
    //}
    //if (this.filterData.value.practicalStatus != null) {
    //  this.filterData.value.practicalStatus = this.filterData.value.practicalStatus.join(",");
    //}

    //if (this.filterData.value != "") {
    //  this.CandidateService.FilterCandidate(this.filterData.value.candidateName,
    //    this.filterData.value.technology,
    //    this.filterData.value.practicalStatus).subscribe(
    //    (data: CandidateModel[]) => {
    //        this.candidateList = data;
    //      }
    //    )
    //}
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    localStorage.setItem("page", page.toString());
  }

  clearFilter() {
    this.CandidateService.filterDataDetails = null;
    this.getCandidate();
  }

  getCandidate() {
    this.CandidateService.getCandidate().subscribe(
      (data: CandidateModel[]) => {
        this.candidateList = data;
        this.dataSource.data = data;
      }
    )
    //this.CandidateService.getCandidate().subscribe(
    //  (data: any) => {
    //    console.log(data);
    //  }
    //)
  }

  onAddEditCandidate(candidateList) {
    var title = candidateList ? candidateList.candidateName : 'Add Candidate Info';
    this.CandidateService.tabsOpen = candidateList;
    this.TabContentComponent.openTab(
      title,
      this.addEditCandidateTemplate,
      candidateList,
      true
    );
  }

  save(dataModel) {
    if (dataModel.id > 0) {
      this.candidateList = this.candidateList.map(candidateList => {
        if (candidateList.candidateId === dataModel.id) {
          return dataModel;
        } else {
          return candidateList;
        }
      });
    }
    else {
      dataModel.id = Math.round(Math.random() * 100);
      this.candidateList.push(dataModel);
    }
    this.TabContentComponent.closeActiveTab();
  }

  completed(candidate) {
    this.CandidateService.changePracticalStatus(candidate, candidate.candidateId)
      .subscribe((data) => {
        window.location.reload();
      });
  }

  deleteItem(candidate) {
    this.confirmDeleteService.openConfirmDialog("Are you sure you want to delete this record?")
      .afterClosed().subscribe(res => {
        if (res) {
          this.CandidateService.deleteCandidateDetails(candidate.candidateId).subscribe(
            (data) => {
            })
        }
        window.location.reload();
      })
  }

  assignPractical(candidateInfo) {
    const dialogAssignConfig = new MatDialogConfig();
    dialogAssignConfig.disableClose = true;
    dialogAssignConfig.id = "modal-component";
    dialogAssignConfig.height = "500px";
    dialogAssignConfig.width = "750px";
    dialogAssignConfig.data = {
      candidateId: candidateInfo.candidateId,
      experience: candidateInfo.experience,
      technology: candidateInfo.technology
    }
    const modalAssignDialog = this.matDialog.open(AssignPracticalComponent, dialogAssignConfig);
  }
}
