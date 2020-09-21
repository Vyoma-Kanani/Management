import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { map, catchError } from "rxjs/operators";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MachineService {

  myAppUrl: string = ''

  constructor(private _http: HttpClient, private http: Http) {
    this.myAppUrl = 'https://localhost:44354/';
  }

  getMachines() {
    let url: string = this.myAppUrl + 'api/Machine/MachineDetails';
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getMachineById(id: number) {
    let url: string = this.myAppUrl + 'api/Machine/MachineDetailsById/' + id;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  verifyIp(currentIp: string) {
    let url: string = this.myAppUrl + 'api/Machine/verifyIp/' + currentIp;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  deleteMachineDetails(machineId: number) {
    let url: string = this.myAppUrl + 'api/Machine/deleteMachine/' + machineId;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  addMachine(machine) {
    let url: string = this.myAppUrl + 'api/Machine/AddMachine' ;
    return this._http.post(url, machine).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  editMachineDetails(practical, id) {
    let url: string = this.myAppUrl + 'api/Machine/editMachine/' + id ;
    return this._http.put(url, practical).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }
  getInactiveMachine() {
    let url: string = this.myAppUrl + 'api/Machine/getInactiveMachine';
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
