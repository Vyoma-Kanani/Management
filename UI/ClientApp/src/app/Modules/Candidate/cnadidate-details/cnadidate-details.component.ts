import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/Core/Services/candidate.service';
import { CandidateDetailsModel } from 'src/app/Core/Models/candidateDetailsModel';

@Component({
  selector: 'app-cnadidate-details',
  templateUrl: './cnadidate-details.component.html',
  styleUrls: ['./cnadidate-details.component.css']
})
export class CnadidateDetailsComponent implements OnInit {
  candidateId: number;
  candidateAllDetails: CandidateDetailsModel;

  constructor(private actRoute: ActivatedRoute,
    private CandidateService: CandidateService) {
    this.candidateId = this.actRoute.snapshot.params.candidateId;
  }

  ngOnInit(): void {
    this.candidateDetails();
  }

  candidateDetails() {
    this.CandidateService.getCandidateAllDetails(this.candidateId).subscribe(
      (data: CandidateDetailsModel[]) => {
        this.candidateAllDetails = data[0];
      })
  }
}
