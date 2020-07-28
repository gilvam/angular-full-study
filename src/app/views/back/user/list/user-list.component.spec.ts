import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { TestSuite } from '../../../../../test-suite';
import { UserListComponent } from './user-list.component';
import { DebugElement, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../_shared/shared.module';
import { MenuActionStore } from '../../../../_shared/stores/menu-action.store';
import { MenuBottomStore } from '../../../../_shared/stores/menu-bottom.store';
import { SidenavEndStore } from '../../../../_shared/stores/sidenav-end.store';
import { SidenavStartStore } from '../../../../_shared/stores/sidenav-start.store';
import { UserService } from '../../../../services/http/user.service';
import { InjectorModule } from '../../../../_shared/injector.module';
import { MaterialModule } from '../../../../_shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UiPaginateModule } from 'study-ui-ngx';
import { of } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { UserModel } from '../../../../models/user.model';
import { AuthService } from '../../../../services/http/auth.service';
import { environment } from '../../../../../environments/environment';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  localStorage.setItem('access_token',
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4` +
    `gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c2`,
  );
  return localStorage.getItem('access_token');
}


describe('UserListComponent', () => {
  // TestSuite.configure();

  // let component: UserListComponent;
  // let fixture: ComponentFixture<UserListComponent>;
  // let httpClient: HttpClientTestingModule;
  // let httpTestingController: HttpTestingController;
  // let userService: UserService;
  // let authService: AuthService;

  // // before each test, default value and delete old test
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       UserListComponent,
  //     ],
  //     imports: [
  //       InjectorModule,
  //       MaterialModule,
  //       BrowserAnimationsModule,
  //       HttpClientTestingModule,
  //       RouterTestingModule,
  //       SharedModule,
  //       UiPaginateModule,
  //     ],
  //     providers: [
  //       MenuActionStore,
  //       MenuBottomStore,
  //       SidenavEndStore,
  //       SidenavStartStore,
  //       UserService,
  //       AuthService,
  //     ],
  //   });
  //
  //   // Inject the http, test controller, and service-under-test as they will be referenced by each test.
  //   // httpClient = TestBed.get(HttpClientTestingModule);
  //   // httpTestingController = TestBed.get(HttpTestingController);
  //   // userService = TestBed.get(UserService);
  //   // authService = TestBed.get(AuthService);
  // });

  // beforeEach(() => {
  //   userService = TestBed.get(UserService); // Mock Data to test the service
  //   authService = TestBed.get(AuthService); // Mock Data to test the service
  //   fixture = TestBed.createComponent(UserListComponent);
  //   fixture.debugElement.injector.get(Injector);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // afterEach(() => { // After every test, assert that there are no more pending requests.
  //   httpTestingController.verify();
  // });

  // ISOLATED UNIT TESTS -------------------------------------------------------------------------------------------------------------------
  // it('component criado', () => {
  //   expect(component).toBeTruthy();
  // });

  // // Test getCourses()
  // describe('getCourses', () => {
  //
  //   const params: HttpParams = new HttpParams();
  //
  //   // Mock Data to test the service
  //   beforeEach(() => {
  //     userService = TestBed.get(UserService);
  //   });
  //
  //   // Test getCoures()
  //   it('should return all courses', () => {
  //     userService.findAll(params, { page: 0 }, { size: 10 }).subscribe(
  //       // courses => expect(courses).toEqual(expectedCourses));
  //       response => expect(response.content.length).toBeGreaterThan(1));
  //   });
  //
  // });

  // const mockData = { id: 1, token: 'fake-jwt-token', username: 'Dino da Silva Sauro' } as any;
  //
  // it('should display the correct amount of data elements',
  //   inject([HttpTestingController, AuthService],
  //     (httpMock: HttpTestingController, svc: AuthService) => {
  //
  //       svc.login('email@mail.com', '123');  // has the subscribe in it
  //
  //       console.log('svc: ', svc);
  //
  //       const callingURL = svc['http://localhost:9090/user']; // your api call eg. data/items
  //
  //       const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
  //         console.log('req.url: ', req.url);
  //         console.log('callingURL: ', callingURL);
  //         console.log('svc: ', svc);
  //         console.log('isLogged: ', svc.isLogged);
  //         // return req.url.indexOf(callingURL) !== -1;
  //         return true;
  //       });
  //
  //       mockReq.flush(mockData);
  //
  //       httpMock.verify();
  //
  //       // console.log('mockData: ', mockData);
  //
  //       // expect(component.svc.data.length).toBe(mockData.length);
  //
  //       fixture.detectChanges();
  //       // UI check here
  //
  //     }));

  // let authService: AuthService;
  // beforeEach(() => authService = TestBed.get(AuthService));
  //
  // let httpTestingController: HttpTestingController;
  // beforeEach(() => httpTestingController = TestBed.get(HttpTestingController));
  //
  // afterEach(() => {
  //   httpTestingController.verify();
  // });
  //
  // // it('should get user from API', fakeAsync(() => {
  // //
  // //   let user: any;
  // //
  // //   authService.login('email@mail.com', '123')
  // //     .subscribe(response => {
  // //       console.log('response: ', response);
  // //       user = response;
  // //     });
  // //
  // //
  // //   // const req = httpTestingController.expectOne('/city-weather/lyon');
  // //   //
  // //   // req.flush({ id: 1, token: 'fake-jwt-token', username: 'Dino da Silva Sauro' });
  // //   //
  // //   // expect(user).toEqual({ id: 1, token: 'fake-jwt-token', username: 'Dino da Silva Sauro' });
  // //
  // //
  // // }));
  //
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
  //
  // beforeEach(fakeAsync(() => {
  //
  //   authService.login('email@mail.com', '123')
  //     .subscribe((data: any) => {
  //       console.log('data: ', data);
  //     });
  //
  // }));
  //
  // it('should get all danger flags', (done) => {
  //   authService.login('email@mail.com', '123')
  //     .subscribe((data: any) => {
  //       console.log('data: ', data);
  //       expect(data.length).toBe(3);
  //       done();
  //     });
  // });


// // We declare the variables that we'll use for the Test Controller and for our Service
//   let httpTestingController: HttpTestingController;
//   let authService: AuthService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         UserListComponent,
//       ],
//       imports: [
//         InjectorModule,
//         MaterialModule,
//         BrowserAnimationsModule,
//         HttpClientTestingModule,
//         RouterTestingModule,
//         SharedModule,
//         UiPaginateModule,
//       ],
//       providers: [
//         MenuActionStore,
//         MenuBottomStore,
//         SidenavEndStore,
//         SidenavStartStore,
//         UserService,
//         AuthService,
//       ],
//     });
//
//     // We inject our service (which imports the HttpClient) and the Test Controller
//     httpTestingController = TestBed.get(HttpTestingController);
//     authService = TestBed.get(AuthService);
//   });

  // it('should get customers from api', () => {
  //   fixture.detectChanges();
  //   const req = httpTestingController.expectOne('http://localhost:9090/user?page=0&size=25');
  //   expect(req.request.method).toBe('GET');
  //   expect(req.flush([]));
  // });


  // // Angular default test added when you generate a service using the CLI
  // it('should be created', () => {
  //   expect(authService).toBeTruthy();
  // });

  // it('returned Observable should match the right data', () => {
  //   const mockUser = { id: 1, username: 'Dino da Silva Sauro', token: 'fake-jwt-token' };
  //
  //   authService.login('email@mail.com', '123')
  //     .subscribe(response => {
  //       console.log('response test: ', response);
  //       expect(response.username).toEqual('Dino da Silva Sauro');
  //     });
  //
  //   const req = httpTestingController.expectOne('http://localhost:9090/user?page=0&size=25');
  //
  //   expect(req.request.method).toEqual('GET');
  //
  //   // req.flush(mockUser);
  // });

  // it('should add HTTP params', () => {
  //   authService.login('email@mail.com', '123').subscribe();
  //
  //   const req = httpTestingController.expectOne(response => response.params.has('username'));
  //
  //   req.flush({});
  // });
  // it('should add HTTP params', fakeAsync(() => {
  //   authService.login('email@mail.com', '123').subscribe();
  //
  //   const req = httpTestingController.expectOne(response => response.params.has('username'));
  //   tick();
  //   req.flush({});
  // }));

  // it('should remove null/undefined/empty values from HTTP params', () => {
  //   authService.login('email@mail.com', '123').subscribe();
  //
  //   const req = httpTestingController.expectOne(response => response.url.includes('district'));
  //
  //   expect(req.request.params.has('id')).toBeTruthy();
  //   expect(req.request.params.has('username')).toBeFalsy();
  //   expect(req.request.params.has('token')).toBeFalsy();
  //
  //   req.flush({});
  // });

  // it('should show customers list', () => {
  //   fixture.detectChanges();
  //
  //   const req = httpTestingController.expectOne('http://localhost:5000/api/customers');
  //   req.flush({ items: [{}, {}] });
  //
  //   fixture.detectChanges(); // IMPORTANT
  //   fixture.whenStable().then(() => {
  //     expect(fixture.nativeElement.querySelector('.customers-list').length).toBe(1);
  //     expect(fixture.nativeElement.querySelector('.customer-list-item').length).toBe(2);
  //   });
  // });

  // afterEach(() => {
  //   httpTestingController.verify();
  // });


  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        InjectorModule,
        // plugins
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['https://jsonplaceholder.typicode.com', 'https://api.github.com'],
          },
        }),
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        AuthService,
      ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    authService = TestBed.get(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  // it('Authorization header', () => {
  //   // Expect one request with an authorization header
  //   const req = httpTestingController.expectOne(
  //     response => response.headers.has('Authorization')
  //   );
  // });

  // it('can test HttpClient GET', () => {
  //   const testData = {
  //     id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz',
  //     address: {
  //       street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' },
  //     }, phone: '1-770-736-8031 x56442', website: 'hildegard.org',
  //     company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' },
  //   };
  //
  //   httpClient.get<any>('https://jsonplaceholder.typicode.com/users/1') // Make an HTTP GET request
  //     .subscribe(data =>
  //       expect(data).toEqual(testData), // When observable resolves, result should match test data
  //     );
  //
  //   // The following `expectOne()` will match the request's URL.
  //   // If no requests or multiple requests matched that URL
  //   // `expectOne()` would throw.
  //   const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users/1');
  //
  //   expect(req.request.method).toEqual('GET'); // Assert that the request is a GET.
  //
  //   // Respond with mock data, causing Observable to resolve.
  //   // Subscribe callback asserts that correct data was returned.
  //   req.flush(testData);
  //
  //   httpTestingController.verify(); // Finally, assert that there are no outstanding requests.
  // });

  // it('can test HttpClient POST 1', () => {
  //   const testData = { id: 1, username: 'Dino da Silva Sauro', token: 'fake-jwt-token' };
  //
  //   httpClient.post<any>('http://localhost:9090/auth/signin', { usernameOrEmail: 'email@mail.com', password: '123' })
  //     .subscribe(data =>
  //       expect(data).toEqual(testData),
  //     );
  //
  //   const req = httpTestingController.expectOne({ url: 'http://localhost:9090/auth/signin', method: 'POST' });
  //   expect(req.request.method).toEqual('POST');
  //   req.flush(testData);
  //   httpTestingController.verify();
  // });

  it('can test HttpClient POST 2', () => {
    const testData = { id: 1, username: 'Dino da Silva Sauro', token: 'fake-jwt-token' };

    authService.login('email@mail.com', '123')
      .subscribe(response => {
        console.log('response: ', response);
        expect(response).toEqual(testData);
      });

    const req = httpTestingController.expectOne({ url: `${ environment.api }/auth/signin`, method: 'POST' });
    req.flush(testData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
