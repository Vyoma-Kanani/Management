import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../Services/authentication.service';
import { MatMenu } from '@angular/material/menu';
import { AssignPracticalService } from '../../Services/assign-practical.service';
import { SignalRService } from 'src/app/Shared/Services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { CandidateModel } from '../../Models/candidateModel';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { userDetailsModel } from '../../Models/userDetailsModel';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  private sidenav: MatSidenav;
  screenWidth: number;
  @ViewChild('sideNav', { static: true }) sideNav: ElementRef;

  opened = true;
  candidate: CandidateModel[];
  watcher: any;
  over: any;
  events: string[] = [];
  userId = localStorage.getItem("userId");
  userDetails: userDetailsModel;

  constructor(private router: Router, private CookieService: CookieService,
    private AssignPracticalService: AssignPracticalService,
    public signalRService: SignalRService, private http: HttpClient,
    private authenticationService: AuthenticationService,
    mediaObserver: MediaObserver
  ) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      } 
    });
  }

  ngOnInit(): void {
    //this.signalRService.startConnection();
    //this.signalRService.addTransferChartDataListener();
    this.startHttpRequest();
    this.getUserDetailsById();
  }

  getUserDetailsById() {
    this.authenticationService.getUserDetailsById(+(this.userId))
      .subscribe(
      (data: userDetailsModel) => {
        this.userDetails = data;
      }
    )
  }

  canname: any;
  private startHttpRequest = () => {
    this.AssignPracticalService.getCandidateStatusChange().subscribe(
      (data: CandidateModel) => {
        this.canname = data;
        console.log(data);
      }
    )
  }
  notify = [
    { text: "Tabledriven.Item1", elementRef: null },
    { text: "Tabledriven.Item2", elementRef: null },
  ];
  selected: string;
  menuItems: Array<{ text: string, elementRef: MatMenu }> = this.notify



  select(pText: string) {
    this.selected = pText;
  }


  logout() {
    this.authenticationService.logout();
    window.location.reload();
  }

  show = false;
  autohide = true;
}
