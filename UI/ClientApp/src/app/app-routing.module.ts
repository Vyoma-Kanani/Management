import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateInfoComponent } from './Modules/Candidate/candidate-info/candidate-info.component';
import { PracticalInfoComponent } from './Modules/Practical/practical-info/practical-info.component';
import { LoginComponent } from './Modules/Login/login/login.component';
import { MachineInfoComponent } from './Modules/Machine/machine-info/machine-info.component'
import { EvaluationComponent } from './Modules/Practical/evaluation/evaluation.component';
import { CnadidateDetailsComponent } from './Modules/Candidate/cnadidate-details/cnadidate-details.component';
import { DashboardComponent } from './Modules/Dashboard/dashboard/dashboard.component';
import { MainLayoutComponent } from './Core/Layout/main-layout/main-layout.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path:'candidate', component: CandidateInfoComponent},
  { path: 'practical', component: PracticalInfoComponent },
  { path: 'machine', component: MachineInfoComponent },
  { path: 'evaluation/:candidateId', component: EvaluationComponent },
  { path: 'candidateDetails/:candidateId', component: CnadidateDetailsComponent },
  { path: 'dashboard', component: DashboardComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
