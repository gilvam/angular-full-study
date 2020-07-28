import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CoreJwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const whiteList = ['https://jsonplaceholder.typicode.com', 'https://api.github.com'];
    const containsInWhiteList = whiteList.find(url => request.url.includes(url));
    const token = localStorage.getItem('access_token'); // add authorization header with jwt token if available

    if (token && !containsInWhiteList) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`,
        },
      });
    }

    return next.handle(request);
  }
}
