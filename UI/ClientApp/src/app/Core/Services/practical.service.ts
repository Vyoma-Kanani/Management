import { Injectable, Inject } from '@angular/core';
import { PracticalModel } from '../Models/practicalModel';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Http, ResponseContentType } from '@angular/http';
import { SelectedMachineDetailModel } from '../Models/selectedMachineDetailModel';

@Injectable({
  providedIn: 'root'
})
export class PracticalService {

  myAppUrl: string = ''

  constructor(private _http: HttpClient, private http: Http ) {
    this.myAppUrl = 'https://localhost:44354/';
  }

  getPractical() {
    let url: string = this.myAppUrl + 'api/Practical/Index';
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getPracticalById(id: number) {
    let url: string = this.myAppUrl + 'api/Practical/PracDetailById/' + id;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  deletePracDetails(practicalId: number) {
    let url: string = this.myAppUrl + 'api/Practical/deletePrac/' + practicalId;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  getDocumentDetails(pracId: number, fileType: string) {

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    let url: string = this.myAppUrl + 'api/Practical/DocDetails/' + pracId + '/' + fileType;
    return this._http.get(url, { responseType: 'text' } ).pipe(
      map(res => JSON.stringify(res)),
      catchError(this.errorHandler)
    )
    //let url = this.appUrl + ApiRoute.UserProfile;

    //return this._http.get(url, { responseType: 'text' }).pipe(
    //  map(res => JSON.stringify(res)),
    //  catchError(Common.errorHandler)
    //)

  }

  //upload(file: any) {
  //  let input = new FormData();
  //  let url: string = this.myAppUrl + 'api/Practical/Upload';
  //  input.append("filesData", file);
  //  return this._http.post(url, input).pipe(
  //    map(res => res),
  //    catchError(this.errorHandler)
  //  )
  //}

  addPractical(userid, practical) {
    let url: string = this.myAppUrl + 'api/Practical/Upload/' + userid;
    return this._http.post(url, practical).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  editPractical(practical, id, userId) {
    let url: string = this.myAppUrl + 'api/Practical/editPractical/' + id + '/' + userId;
    return this._http.post(url, practical).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  assignMachine(practicalId, candidateId, machineId, userId) {
    let url: string = this.myAppUrl + 'api/Practical/assignMachine/' + practicalId + '/' + candidateId + '/' + machineId + '/' + userId;
    return this._http.get(url).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }

  //-----------------------Download
  DownloadFile(filePath: string, fileType: string): Observable<any> {
    let fileExtension = fileType;
    let input = filePath;
    let url: string = this.myAppUrl + 'api/Practical/DownloadFile/' + input;
    return this.http.put(url, '',
      { responseType: ResponseContentType.Blob }).pipe(
      map(
        (res) => {
          var blob = new Blob();
          blob = res.blob()
          return blob;
        }),
      catchError(this.errorHandler)
    )
  }

  AutoDownload(details:SelectedMachineDetailModel) {
    let url: string = this.myAppUrl + 'api/Practical/AutoDownloadFile';
    return this._http.post(url, details[0]).pipe(
      map(res => res),
      catchError(this.errorHandler)
    )
  }
}
