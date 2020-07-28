import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/http/auth.service';
import { UserService } from './services/http/user.service';
import { SharedModule } from './_shared/shared.module';
import { MainModule } from './views/main/main.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgForageModule } from 'ngforage';
import { MenuActionStore } from './_shared/stores/menu-action.store';
import { PostService } from './services/http/post.service';
import { CoreJwtInterceptor, CoreTokenService } from 'study-core-ngx';
import { UiAnimationLoadingModule, UiDialogVerificationModule, UiDialogVerificationService } from 'study-ui-ngx';
import { SidenavEndStore } from './_shared/stores/sidenav-end.store';
import { RouterModule } from '@angular/router';
import { TitleService } from './services/title.service';
import { SidenavStartStore } from './_shared/stores/sidenav-start.store';
import { ErrorInterceptor } from './_shared/interceptors/error.interceptor';
import { FakeBackendInterceptor } from './_shared/interceptors/fake-backend.Interceptor';
import { MenuBottomStore } from './_shared/stores/menu-bottom.store';
import { InjectorModule } from './_shared/injector.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { DebitService } from './services/http/debit.service';

@NgModule({
  declarations: [
    AppComponent,
    // UiDialogVerificationModule,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,

    // modules
    SharedModule,
    MainModule,
    InjectorModule,

    // study-core

    // study-ui
    UiAnimationLoadingModule,
    UiDialogVerificationModule,

    // plugins
    NgxPermissionsModule.forRoot(),
    NgForageModule.forRoot({
      name: 'study-web',
      storeName: 'db',
    }),
    JwtModule.forRoot({
      config: {
        // headerName: 'Authorization', // mudar headerName Authorization
        blacklistedRoutes: ['https://jsonplaceholder.typicode.com', 'https://api.github.com'], // nao usar header authorization

        //// Por padrão, o JWT do usuário será enviado em solicitações HttpClient, mesmo que esteja expirado.
        //// Você pode optar por não permitir que o token seja enviado se expirar, definindo skipWhenExpired como true.
        // skipWhenExpired: true,

        //// Configurar throwNoTokenError como true resultará em um erro sendo acionado se um token não puder ser recuperado com a
        //// função tokenGetter. O padrão é falso.
        // throwNoTokenError: true,
        tokenGetter: () => localStorage.getItem('access_token'),
      },
    }),
  ],
  exports: [
    // study-ui
    UiDialogVerificationModule,
    InjectorModule,
  ],
  providers: [
    // interceptors
    { provide: HTTP_INTERCEPTORS, useClass: CoreJwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }, // fake backend

    // material
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' /* legacy,standard,fill,outline */ } },

    FormBuilder,
    // services

    // stores
    MenuActionStore,
    MenuBottomStore,
    SidenavEndStore,
    SidenavStartStore,

    // vaspay-core
    CoreTokenService,

    // study-ui
    UiDialogVerificationService,

    // REST
    AuthService,
    UserService,
    DebitService,
    PostService,
    TitleService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
