import { Component, OnInit } from '@angular/core';
import { AssignPracticalService } from 'src/app/Core/Services/assign-practical.service';
import { ActivePracticalStatusModel } from 'src/app/Core/Models/activePractivalStatusModel';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { GradeCountModel } from 'src/app/Core/Models/GradeCountModel';
import { OverallPassoutCountModel } from 'src/app/Core/Models/OverallPassoutCoountModel';
import { TechCountModel } from 'src/app/Core/Models/TechCountModel';
import { ProgressCountModel } from 'src/app/Core/Models/ProgressCountModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public PracticalMachineUtilization: string[] = ['Occupied Machines', 'Not Occupied Machines'];
  public PracticalPassOut: string[] = ['Passout Candidates', 'Not Passout Candidates'];
  public GradeWise: string[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-'];
  public TodaysPractical: string[] = ['Not Assigned', 'In Progress', 'Under Evaluation', 'Completed'];
  public TechWisePractical = ['Python', 'Angular', 'Node', 'React', 'Django', 'Vue', 'PHP', 'Java'];

  public MachineCount: number[] = [0, 0];
  public gradeCountData: number[] = [0, 0, 0, 0, 0, 0];
  public progressCountData: number[] = [0, 0, 0, 0];
  public techCountData: number[] = [0, 0, 0, 0, 0, 0,0,0];
  public overallPassoutData: number[] = [0, 0];
  public pieChartType: string = 'pie';

  activePracticalDetails: ActivePracticalStatusModel;
  gradeCount: GradeCountModel;
  overallPassout: OverallPassoutCountModel;
  techCount: TechCountModel;
  progressCount: ProgressCountModel;

  public chartColors: Array<any> = [
    { 
      backgroundColor: ['#48C0E1', '#1579c5', '#1538c5', '#6b15c5', '#110e75', '#909eee', '#96ecf7','#16b7ac']
    }
  ]
  constructor(private GlobalService: GlobalService,
    private AssignPracticalService : AssignPracticalService,
  ) { }

  ngOnInit(): void {
    this.getActivePracticals();
    this.getGradeCount();
    this.getTechWisePractical();
    this.getProgressReport();
    this.overAllPassout();
  }
 
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  getActivePracticals() {
    this.AssignPracticalService.getActivePracticalStatus().subscribe(
      (data: ActivePracticalStatusModel[]) => {
        this.activePracticalDetails = data[0];
        this.MachineCount = [this.activePracticalDetails.activePracticals, this.activePracticalDetails.notActivePracticals];
      }
    )
  }

  getGradeCount() {
    this.AssignPracticalService.getGradeCount().subscribe(
      (data: GradeCountModel[]) => {
        this.gradeCount = data[0];
        this.gradeCountData = [this.gradeCount.aPositive, this.gradeCount.a, this.gradeCount.aNegative,
        this.gradeCount.bPositive, this.gradeCount.b, this.gradeCount.bNegative];
      }
    )
  }

  getTechWisePractical() {
    this.AssignPracticalService.getTechWisePracticalCount().subscribe(
      (data: TechCountModel[]) => {
        this.techCount = data[0];
        this.techCountData = [this.techCount.python, this.techCount.angular, this.techCount.nodeJs, this.techCount.react,
        this.techCount.django, this.techCount.vue, this.techCount.php, this.techCount.java];
      }
    )
  }

  getProgressReport() {
    this.AssignPracticalService.getDailyProgressCount().subscribe(
      (data: ProgressCountModel[]) => {
        this.progressCount = data[0];
        this.progressCountData = [this.progressCount.notAssigned, this.progressCount.inProgress,
        this.progressCount.underEvaluation, this.progressCount.completed];
      }
    )
  }

  overAllPassout() {
    this.AssignPracticalService.getOverallPassoutCount().subscribe(
      (data: OverallPassoutCountModel[]) => {
        this.overallPassout = data[0];
        this.overallPassoutData = [this.overallPassout.canProcced, this.overallPassout.canNotProcced];
      }
    )
  }
}
