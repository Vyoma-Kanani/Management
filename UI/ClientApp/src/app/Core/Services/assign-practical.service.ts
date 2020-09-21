import { Injectable, Inject } from '@angular/core';
import { CandidateModel } from '../Models/candidateModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AssignPracticalService {
  public candidateList: CandidateModel[];
  myAppUrl: string = ''

  getCandidateInfoAssign(candidateInfo) {
    this.candidateList = candidateInfo;
  }

  constructor(private _http: HttpClient, ) {
    this.myAppUrl = 'https://localhost:44354/';
  }

  getCandidateStatusChange() {
    let url: string = this.myAppUrl + 'api/Notification/'
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getPracticalToAssign(canId: number, exp: number, tech: string) {
    let url: string = this.myAppUrl + 'api/AssignPractical/getpracByExp/' + canId + '/' + exp + '/' + tech ;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getActivePracticalStatus() {
    let url: string = this.myAppUrl + 'api/AssignPractical/getActivePracticalStatus' ;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getGradeCount() {
    let url: string = this.myAppUrl + 'api/AssignPractical/getGradeCount';
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getOverallPassoutCount() {
    let url: string = this.myAppUrl + 'api/AssignPractical/getOverallPassoutCount';
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getDailyProgressCount() {
    let url: string = this.myAppUrl + 'api/AssignPractical/getDailyProgressCount';
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getTechWisePracticalCount() {
    let url: string = this.myAppUrl + 'api/AssignPractical/getTechWisePracticalCount';
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }  
}
