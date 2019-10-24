import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {  
    constructor() {} 

     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor called!!');
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjo5MDk3NzgsImVtYWlsIjoibWF4aW00MjIwQGdtYWlsLmNvbSIsImFwcGxpY2F0aW9uIjo1MjIxM319.IpbUiq0ZcpgwMw2d2GPNXeqVxa6UYAnJR9Acv646Ao5hsVQlnkzw9dZWtfE_LAhF_hUIFLMvWJQvdFmwYaGqIA';
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });   
     return next.handle(request);
  }
}
