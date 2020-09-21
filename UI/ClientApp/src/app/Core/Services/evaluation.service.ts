import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  myAppUrl: string = ''

  constructor(private _http: HttpClient) {
    this.myAppUrl = 'https://localhost:44354/';
  }

  evaluationPreDetails(candidateId: number) {
    let url: string = this.myAppUrl + 'api/Candidate/evaluationPreDetails/' + candidateId;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getevaluationDetails(candidateId: number, practicalId: number) {
    let url: string = this.myAppUrl + 'api/Candidate/GetEvaluationDetails/' + candidateId + '/' + practicalId;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  addEvaluationDetails(evaluationDetails) {
    let url: string = this.myAppUrl + 'api/Candidate/addEvaluationDetails';
    return this._http.post(url, evaluationDetails).pipe(
      map((response: Response) => response.json()),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
