import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResDataModal } from '../Model/res-data/res-data.module'
@Injectable({
  providedIn: 'root'
})
export class DatasourceService {
  apiUrl = 'https://reqres.in/api/users?page=2';

  constructor(private http: HttpClient) { }

  getData(): Observable<ResDataModal> {
    return this.http.get<ResDataModal>(this.apiUrl);
  }
}
