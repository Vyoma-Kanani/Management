import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import {SharedModule} from './Shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './Core/Layout/main-layout/main-layout.component';
import { CandidateInfoComponent } from './Modules/Candidate/candidate-info/candidate-info.component';
import { AddEditCandidateComponent } from './Modules/Candidate/add-edit-candidate/add-edit-candidate.component';
import { PracticalInfoComponent } from './Modules/Practical/practical-info/practical-info.component';
import { AddEditPracticalComponent } from './Modules/Practical/add-edit-practical/add-edit-practical.component';
import { DynamicTabDirective } from './Shared/directives/dynamic-tab.directive';
import {CandidateService} from './Core/Services/candidate.service'
import { TabsComponent } from './Shared/Modules/tabs/tabs.component';
import { TabContentComponent } from './Shared/Modules/tab-content/tab-content.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import * as CryptoJS from 'crypto-js';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignPracticalComponent } from './Modules/Candidate/assign-practical/assign-practical.component';
import { FilterPipe } from './Shared/Pipes/filter.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { LoginComponent } from './Modules/Login/login/login.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { ChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { AssignMachineComponent } from './Modules/Practical/assign-machine/assign-machine.component';
import { MachineInfoComponent } from './Modules/Machine/machine-info/machine-info.component';
import { AddEditMachineComponent } from './Modules/Machine/add-edit-machine/add-edit-machine.component';
import { ConfirmDeleteComponent } from './Shared/Modules/confirm-delete/confirm-delete.component';
import { EvaluationComponent } from './Modules/Practical/evaluation/evaluation.component';
import { CnadidateDetailsComponent } from './Modules/Candidate/cnadidate-details/cnadidate-details.component';
import { DashboardComponent } from './Modules/Dashboard/dashboard/dashboard.component';
import { FiltersPipe } from './Shared/Pipes/filters.pipe';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CandidateInfoComponent,
    AddEditCandidateComponent,
    PracticalInfoComponent,
    AddEditPracticalComponent,
    DynamicTabDirective,
    TabsComponent,
    TabContentComponent,
    AssignPracticalComponent,
    FilterPipe,
    LoginComponent,
    AssignMachineComponent,
    MachineInfoComponent,
    AddEditMachineComponent,
    ConfirmDeleteComponent,
    EvaluationComponent,
    CnadidateDetailsComponent,
    DashboardComponent,
    FiltersPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgSelectModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    OrderModule,
    ChartsModule,
    FlexLayoutModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [CookieService, { provide: BASE_URL, useValue: "http://localhost:54385/" }],
  bootstrap: [AppComponent],
  entryComponents:[
    CandidateInfoComponent,
    AddEditCandidateComponent,
  ]
})
export class AppModule { }
