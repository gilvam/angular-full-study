import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSuite } from '../../../../test-suite';
import { LoginComponent } from './login.component';
import { Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../_shared/shared.module';
import { MenuActionStore } from '../../../_shared/stores/menu-action.store';
import { MenuBottomStore } from '../../../_shared/stores/menu-bottom.store';
import { SidenavEndStore } from '../../../_shared/stores/sidenav-end.store';
import { SidenavStartStore } from '../../../_shared/stores/sidenav-start.store';
import { AuthService } from '../../../services/http/auth.service';
import { InjectorModule } from '../../../_shared/injector.module';
import { MaterialModule } from '../../../_shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginComponent', async () => {
  TestSuite.configure();

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      imports: [
        InjectorModule, MaterialModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule, SharedModule,
      ],
      providers: [
        MenuActionStore, MenuBottomStore, SidenavEndStore, SidenavStartStore, AuthService,
      ],
    }).compileComponents();

    // Inject the http, test controller, and service-under-test as they will be referenced by each test.
    httpClient = TestBed.get(HttpClientTestingModule);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService); // Mock Data to test the service
    fixture = TestBed.createComponent(LoginComponent);
    fixture.debugElement.injector.get(Injector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // // remove o component a ser renderizado na tela do karma
  // afterEach(() => {
  //   if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
  //     (fixture.nativeElement as HTMLElement).remove();
  //   }
  // });

  // ISOLATED UNIT TESTS -------------------------------------------------------------------------------------------------------------------
  it('component criado', () => {
    expect(component).toBeTruthy();
  });

  // it('não está logado', async () => {
  //   expect(authService.isLogged).not.toEqual(true);
  // });

  // SHALLOW RENDERING TEST ----------------------------------------------------------------------------------------------------------------
  it('SHALLOW - contém 1 imagem', () => {
    expect(fixture.debugElement.nativeElement.querySelector('img')).toBeTruthy();
  });

  it('SHALLOW - contém 2 inputs no formulário', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('form input.mat-form-field-autofill-control').length).toEqual(2);
  });


  // let httpClientSpy;
  // beforeEach(() => {
  //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  // });
  //
  // it('login 01', async () => {
  //   const responseTest = { id: 1, token: 'fake-jwt-token', username: 'Dino da Silva Sauro' } as any;
  //   httpClientSpy.get.and.returnValue(of(responseTest));
  //   await authService.login('email@mail.com', '123')
  //     .subscribe((response: any) => expect(response).toEqual(responseTest, 'same items'));
  // });
});
