import { Injectable, Inject } from '@angular/core';
import { CandidateModel } from '../Models/candidateModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { FilterPipe } from 'src/app/Shared/Pipes/filter.pipe';
import { FilterCandidateDataModel } from '../Models/filterCandidateDataModel';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  public candidateList: CandidateModel;
  public filterDataDetails: FilterCandidateDataModel;

  public tabsOpen: any;

  getCandidateInfoEdit(candidateInfo) {
    this.candidateList = candidateInfo;
  }

  myAppUrl: string = ''

  constructor(private _http: HttpClient, ) {
    this.myAppUrl = 'https://localhost:44354/';
  }

  getCandidate() {
    let url: string = 'https://localhost:44354/api/Candidate/Index';
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
    //let url: string = this.myAppUrl + 'api/Candidate/Index';
    //return this._http.get(url).pipe(
    //  map(res => res),
    //  catchError(this.errorHandler)
    //)
  }

  verifyEmail(email: string) {
    let url: string = this.myAppUrl + 'api/Candidate/verifyEmail/' + email;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getCandidateId(id: number) {
    let url: string = this.myAppUrl + 'api/Candidate/DetailsById/' + id;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  //FilterCandidate(name:string, tech: string, status: number) {
  //  let url: string = this.myAppUrl + 'api/Candidate/Details?CandidateName=' + name + '&PracticalStatus= ' + status + '&Technology=' + tech;

  //  return this._http.get(url).pipe(
  //    map(res => res),
  //    catchError(this.errorHandler)
  //  )
  //}
  FilterCandidates(FilterCandidate: FilterCandidateDataModel) {
    //let url: string = this.myAppUrl + 'api/Candidate/Details?CandidateName=' + name + '&PracticalStatus= ' + status + '&Technology=' + tech;

    //return this._http.get(url).pipe(
    //  map(res => res),
    //  catchError(this.errorHandler)
    //)
    let url: string = this.myAppUrl + 'api/Candidate/Detailsfilter';
    return this._http.post(url, FilterCandidate).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  addCandidate(candidate) {

    let url: string = this.myAppUrl + 'api/Candidate/Create';
    return this._http.post(url, candidate).pipe(
        map((response: Response) => response.json()),
        catchError(this.errorHandler)
      )
  }
  editCandidate(candidate, id: number) {
    let url: string = this.myAppUrl + 'api/Candidate/Edit/' + id;
    return this._http.put(url, candidate).pipe(
      map((response: Response) => response.json()),
      catchError(this.errorHandler)
    )
  }

  deleteCandidateDetails(id: number) {
    let url: string = this.myAppUrl + 'api/Candidate/delete/' + id;
    return this._http.get(url).pipe(
      map((response: Response) => response.json()),
      catchError(this.errorHandler)
    )
  }

  getCandidateAllDetails(id: number) {
    let url: string = this.myAppUrl + 'api/Candidate/GetCandidateAllDetails/' + id;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  changePracticalStatus(candidate, id:number) {
    let url: string = this.myAppUrl + 'api/Candidate/PracEdit/' + id;
    return this._http.put(url, candidate, { responseType: 'text' }).pipe(
      map((response) => response),
      catchError(this.errorHandler)
    )
  }
  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }  
}
