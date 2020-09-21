import { Component, OnInit, EventEmitter, Output, ComponentFactoryResolver, Injectable, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CandidateModel } from 'src/app/Core/Models/candidateModel';
import { CandidateService } from '../../../Core/Services/candidate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../Shared/Services/global.service'
import { TabContentComponent } from 'src/app/Shared/Modules/tab-content/tab-content.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css']
})

@Injectable()

export class AddEditCandidateComponent implements OnInit {

  addEditCandidate: FormGroup;
  candidateList: CandidateModel;
  title: string;
  candidateId: number;
  errorMessage: any;
  currentEmail: string;
  //candidate: Candidate = new Candidate();
  submitted = false;
  mobilePattern = "[1-9]{10}"
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(TabContentComponent, { static: true }) TabContentComponent;

  constructor(private CandidateService: CandidateService,
    private formBuilder: FormBuilder,
    private _avRoute: ActivatedRoute,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private GlobalService: GlobalService
  ) {
    if (this._avRoute.snapshot.params["candidateId"]) {
      this.candidateId = this._avRoute.snapshot.params["candidateId"];
    }

    this.addEditCandidate = this.formBuilder.group({
      candidateId: 0,
      candidateName: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
      technology: ['', [Validators.required]],
    })
  }

  techList = this.GlobalService.techList;
  techselected: any;

  ngOnInit() {
    this.candidateId = this.CandidateService.candidateList ? this.CandidateService.candidateList.candidateId : null;

    this.title = this.candidateId ? 'Edit Candidate' : 'Add Candidate'
    if (this.candidateId != null) {
      this.getCandidateById();
    }
  }

  get validationCheck() { return this.addEditCandidate.controls; }

  verifyEmail(event) {
    this.currentEmail = event.target.value;
    this.CandidateService.verifyEmail(this.currentEmail).subscribe(
      (data: boolean) => {
        if (!data) {
          this.addEditCandidate.controls['email'].setErrors({ 'incorrect': true });
        }
      }
    )
    console.log(event);
  }

  getCandidateById() {
    this.CandidateService.getCandidateId(this.candidateId).subscribe(
      (data: CandidateModel[]) => {
        this.candidateList = data[0];
        this.setCanDetails();
      }
    )
  }
  setCanDetails() {
    this.addEditCandidate.get('candidateName').patchValue(this.candidateList.candidateName);
    this.addEditCandidate.get('experience').patchValue(this.candidateList.experience);

    this.techselected = this.candidateList.technology.split(',');
    this.addEditCandidate.get("email").patchValue(this.candidateList.email);
    this.addEditCandidate.get("mobile").patchValue(this.candidateList.mobile);
  }

  save() {
    this.submitted = true;

    if (this.addEditCandidate.invalid) {
      return;
    }

    var message: string = '';
    if (this.addEditCandidate.value.technology.length > 0) {
      this.addEditCandidate.value.technology = this.addEditCandidate.value.technology.join(",");
    }

    if (this.candidateId) {
      this.CandidateService.editCandidate(this.addEditCandidate.value, this.candidateId)
        .subscribe((data) => {
          this.TabContentComponent.closeActiveTab()
        }, error => this.errorMessage = error)
    }
    else {
      this.CandidateService.addCandidate(this.addEditCandidate.value)
        .subscribe((data) => {
          this.router.navigate(['/candidate']);
          localStorage.setItem("page", "1");
        }, error => this.errorMessage = error)
    }
    //this.router.navigate(['/candidate']);

    
    //this.cancel();
    window.location.reload();
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  cancel(): void {
    this.close.emit(null);
  }

}
