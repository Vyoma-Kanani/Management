import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { retryWhen } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler)
  {
    let token = localStorage.getItem('token');
    request = this.addtoken(request, token);
    return next.handle(request);
  }

  private addtoken(request: HttpRequest<any>, token: string)
  {

    return request.clone(
      //setHeaders : { 'Authorization': `Bearer ${token}` }
    );
  }
  
}
