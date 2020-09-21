import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/Core/Services/candidate.service';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { EvaluationService } from 'src/app/Core/Services/evaluation.service';
import { EvaluationPreDetailsModel } from 'src/app/Core/Models/evaluationPreDetailsModel';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { EvaluationDetailsModel } from 'src/app/Core/Models/evaluationDetailsModel';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})

export class EvaluationComponent implements OnInit {
  candidateId: number;
  evaluationPreDetailInfo: EvaluationPreDetailsModel;
  evaluationDetails: EvaluationDetailsModel;
  evaluatePractical: FormGroup;
  errorMessage: any;
  gradeList = this.GlobalService.gradeList;
  submitted = false;
  status: number;
  markings = this.GlobalService.markings;

  gradeselecteds: any;
  gradeselect: string;

  constructor(private actRoute: ActivatedRoute,
    private CandidateService: CandidateService,
    private EvaluationService: EvaluationService,
    private GlobalService: GlobalService,
    private router: Router,
    private formBuilder: FormBuilder, ) {
    this.candidateId = this.actRoute.snapshot.params.candidateId;
    this.evaluatePractical = this.formBuilder.group({
      candidateName: [''],
      candidateId: [''],
      practicalName: [''],
      practicalId: [''],
      implemented: [''],
      notImplemented: [''],
      findings: [''],
      reviewerComment: [''],
      percentageComplete: [''],
      remark: [''],
      canProceed: [''],
      grade: [''],
      codeReview: [''],
      canDoAttitude: [''],
      communication: ['']
    })

    console.log(this.gradeselecteds);

    this.evaluatePractical.valueChanges.subscribe(data => console.log(data))

  }

  ngOnInit(): void {
    this.getCandidate();
  }

  markingsArray = [
    {
      "grade": "A+",
      "minPercent": 80,
      "maxPercent": 100,
      "canDoAttitude": 4.5,
      "codeReview": 4.5,
      "communication":4.5
    },
    {
      "grade": "A",
      "minPercent": 80,
      "maxPercent": 100,
      "canDoAttitude": 4,
      "codeReview": 4,
      "communication": 4
    },
    {
      "grade": "A-",
      "minPercent": 70,
      "maxPercent": 80,
      "canDoAttitude": 4,
      "codeReview": 4,
      "communication": 4
    },
    {
      "grade": "B+",
      "minPercent": 60,
      "maxPercent": 70,
      "canDoAttitude": 4,
      "codeReview": 4,
      "communication": 4
    },
    {
      "grade": "B",
      "minPercent": 60,
      "maxPercent": 70,
      "canDoAttitude": 3.5,
      "codeReview": 3.5,
      "communication": 3.5
    },
    {
      "grade": "B-",
      "minPercent": 50,
      "maxPercent": 60,
      "canDoAttitude": 3.5,
      "codeReview": 3.5,
      "communication": 3.5
    },
  ]

  gradechange() {
    if (this.evaluatePractical.value.percentageComplete != null && this.evaluatePractical.value.codeReview != null && this.evaluatePractical.value.canDoAttitude != null && this.evaluatePractical.value.communication != null) {
      this.gradeselecteds = this.markingsArray.filter(s => {
        if (s.minPercent <= this.evaluatePractical.value.percentageComplete
          && s.maxPercent > this.evaluatePractical.value.percentageComplete
          && s.canDoAttitude <= this.evaluatePractical.value.canDoAttitude
          && s.codeReview <= this.evaluatePractical.value.codeReview
          && s.communication <= this.evaluatePractical.value.communication) {
          return s.grade;
        }
        return '';
      }
    )}

    this.gradeselect = this.gradeselecteds[0].grade;

  }

  get validationCheck() { return this.evaluatePractical.controls; }

  getCandidate() {
    this.EvaluationService.evaluationPreDetails(this.candidateId).subscribe(
      (data: EvaluationPreDetailsModel[]) => {
        this.evaluationPreDetailInfo = data[0];
        if (this.evaluationPreDetailInfo.candidateStatus == 3) {
          this.getEvaluationDetails();
        }
        else {
          this.setCandidateDetails();
        }
      }
    )
  }

  setCandidateDetails() {
    this.evaluatePractical.get('candidateName').patchValue(this.evaluationPreDetailInfo.candidateName);
    this.evaluatePractical.get('practicalName').patchValue(this.evaluationPreDetailInfo.practicalName);
    this.evaluatePractical.get('candidateId').patchValue(this.candidateId);
    this.evaluatePractical.get('practicalId').patchValue(this.evaluationPreDetailInfo.practicalId);
  }

  getEvaluationDetails() {
    this.EvaluationService.getevaluationDetails(this.candidateId, this.evaluationPreDetailInfo.practicalId).subscribe(
      (data: EvaluationDetailsModel[]) => {
        this.evaluationDetails = data[0];
        this.setEvaluationDetails();
      }
    )
  }

  setEvaluationDetails() {
    setTimeout(() => this.evaluatePractical.disable(), 200);
    this.status = 3;
    this.evaluatePractical.get('candidateName').patchValue(this.evaluationPreDetailInfo.candidateName);
    this.evaluatePractical.get('practicalName').patchValue(this.evaluationPreDetailInfo.practicalName);
    this.evaluatePractical.get('implemented').patchValue(this.evaluationDetails.implemented);
    this.evaluatePractical.get('notImplemented').patchValue(this.evaluationDetails.notImplemented);
    this.evaluatePractical.get('findings').patchValue(this.evaluationDetails.findings);
    this.evaluatePractical.get('grade').patchValue(this.evaluationDetails.grade);
    this.evaluatePractical.get('percentageComplete').patchValue(this.evaluationDetails.percentageComplete);
    this.evaluatePractical.get('canProceed').patchValue(this.evaluationDetails.canProceed);
    this.evaluatePractical.get('remark').patchValue(this.evaluationDetails.remark);
    this.evaluatePractical.get('reviewerComment').patchValue(this.evaluationDetails.reviewerComment);
    this.evaluatePractical.get('codeReview').patchValue(this.evaluationDetails.codeReview);
    this.evaluatePractical.get('canDoAttitude').patchValue(this.evaluationDetails.canDoAttitude);
    this.evaluatePractical.get('communication').patchValue(this.evaluationDetails.communication);

  }

  submit() {
    this.submitted = true;

    if (this.evaluatePractical.invalid) {
      return;
    }

    var message: string = '';
    if (this.evaluatePractical.value['canProceed'] == false) {
      this.evaluatePractical.value['canProceed'] = 0;
    }
    if (this.evaluatePractical.value['canProceed'] == true) {
      this.evaluatePractical.value['canProceed'] = 1;
    }

    this.EvaluationService.addEvaluationDetails(this.evaluatePractical.value)
      .subscribe((data) => {
        this.router.navigate(['/candidate']);
      }, error => this.errorMessage = error)

    this.router.navigate(['/candidate']);
  }











  //form: FormGroup;
  //purchaseprice: number;
  //purchasepricetaxes: number;

  //createForm() {
  //  this.form = this.formBuilder.group({
  //    purchaseprice: [''],
  //    taxes: '21',
  //    purchasepricetaxes: [''],

  //  })
  //}

  //calculatePurchasePriceTaxes() {
  //  return this.form.value.purchasepricetaxes / (1 + (this.form.value.taxes / 100))

  //}

  //calculatePurchasePrice() {
  //  return ((this.form.value.purchaseprice * (this.form.value.taxes / 100)) + +this.form.value.purchaseprice);
  //}



  //submits() {
  //  console.log(this.form)
  //}
}
