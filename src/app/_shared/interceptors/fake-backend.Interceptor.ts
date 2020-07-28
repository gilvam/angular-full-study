import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const testUser = { id: 1, email: 'dino@mail.com', password: '123', name: 'Dino da Silva Sauro', profile: 'Administrador' };

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/auth/signin') && request.method === 'POST') {
        console.log('FakeBackendInterceptor fake-jwt-token -> ', request.url);
        console.log('request.body: ', request.body);

        if (request.body.email === testUser.email && request.body.password === testUser.password) {
          // if login details are valid return 200 OK with a fake jwt token
          const body = {
            token: 'fake-jwt-token',
            id: testUser.id,
            name: testUser.name,
            email: testUser.email,
            profile: testUser.profile,
            // exp: moment().add((1), 'day').unix(), // add 1 dia para expirar e transforma em formato unix
          };
          // console.log('body.exp: ', moment.unix(body.exp).format('DD/MM/YYYY HH:mm:ss'), moment().format('DD/MM/YYYY HH:mm:ss'));
          // console.log('body.exp: ', body.exp, moment().unix(), body.exp >= moment().unix());

          return of(new HttpResponse({ status: 200, body }));
        } else {
          // else return 400 bad request
          return throwError({ error: { message: 'Username or password is incorrect' } });
        }
      }

      // get users
      if (request.url.endsWith('/userFake') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({ status: 200, body: [testUser] }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({ error: { message: 'Unauthorised' } });
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))

    // call materialize and dematerialize to ensure delay even if an error is thrown https://github.com/Reactive-Extensions/RxJS/issues/648
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
