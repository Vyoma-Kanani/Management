import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable } from 'rxjs';
import { userDetailsModel } from '../Models/userDetailsModel';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  myAppUrl: string = ''

  public userdetails: userDetailsModel;

  constructor(private http: HttpClient,
    private CookieService: CookieService,
    private router: Router,
  ) { this.myAppUrl = 'https://localhost:44354/'; }

  login(loginName: string, password: string) {
    let url: string = this.myAppUrl + 'api/Login/Login/';
    return this.http.post(url, { loginName, password }).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('Token', JSON.stringify(user["token"]));
          localStorage.setItem('userId', JSON.stringify(user["userId"]));
          this.CookieService.set('tokenInfo', user["token"]);
        }
        return user;
      }),
      catchError(this.errorHandler)
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('TokenInfo');
    this.CookieService.delete('tokenInfo');
    this.router.navigate(['/']);
  }

  getUserDetailsById(userId: number) {
    let url: string = this.myAppUrl + 'api/Login/getUserDetailsById/' + userId;
    return this.http.get(url).pipe(
      map(data => {
        return data;
      }),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
