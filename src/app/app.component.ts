import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { TitleService } from './services/title.service';
import { Observable } from 'rxjs';
import { AuthService } from './services/http/auth.service';
import { CoreNavParamsService } from 'study-core-ngx';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  // title = 'test study';
  environment = environment;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private permissionsService: NgxPermissionsService,
    public titleService: TitleService,
    public authService: AuthService,
    public coreNavParams: CoreNavParamsService,
  ) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.changeIsLogged;
    const perms = ['ADMIN'];
    this.permissionsService.loadPermissions(perms);
    this.titleService.init();
  }

  componentAdded(event) {
    // console.log('componentAdded: ', event);
  }

  componentRemoved(event) {
    // console.log('componentRemoved: ', event);
  }

}
