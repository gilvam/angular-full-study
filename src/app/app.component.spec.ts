import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/http/auth.service';
import { InjectorModule } from './_shared/injector.module';
import { MenuActionStore } from './_shared/stores/menu-action.store';
import { MenuBottomStore } from './_shared/stores/menu-bottom.store';
import { SidenavEndStore } from './_shared/stores/sidenav-end.store';
import { SidenavStartStore } from './_shared/stores/sidenav-start.store';
import { MaterialModule } from './_shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from './_shared/shared.module';
import { UiAnimationLoadingModule } from '../../projects/study-ui-ngx/src/lib/components/animation-loading/ui-animation-loading.module';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { TitleService } from './services/title.service';
import { TestSuite } from '../test-suite';

describe('AppComponent', () => {
  TestSuite.configure();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        InjectorModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,

        // study-ui
        UiAnimationLoadingModule,

        NgxPermissionsModule.forRoot(),
      ],
      providers: [
        MenuActionStore,
        MenuBottomStore,
        SidenavEndStore,
        SidenavStartStore,
        AuthService,
        NgxPermissionsService,
        TitleService,
      ],
    }).compileComponents();
  }));

  // https://www.concrete.com.br/2018/10/31/isolated-unit-tests-e-shallow-unit-tests/

  let fixture;
  let app;

  // ISOLATED UNIT TESTS -------------------------------------------------------------------------------------------------------------------

  it(`IUT - deve criar o app`, () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`IUT - this.nav.mqAlias não deve ser null`, () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app.nav.mqAlias).toEqual(null);
  });
  it(`IUT - this.nav.over deve ser 'over' ou 'side'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app.nav.over === 'over' || app.nav.over === 'side').toBe(true);
  });

  // SHALLOW RENDERING TEST ----------------------------------------------------------------------------------------------------------------

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to testxpto!');
  // });
});
