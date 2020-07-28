import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { GenericService } from '../generic.service';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService extends GenericService<UserModel> {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private CURRENT_USER: any;

  constructor(
    public jwtHelper: JwtHelperService,
  ) {
    super();
    this.loggedIn.next(this.isLoggedIn);
  }

  private setChangeIsLogged() {
    this.loggedIn.next(true);
  }

  get isLoggedIn(): boolean {
    return this.jwtHelper.tokenGetter() ? true : false;
  }

  get changeIsLogged() {
    return this.loggedIn.asObservable();
  }

  setLocalStorage(user: any) {
    this.CURRENT_USER = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('access_token', user.token);
    this.setChangeIsLogged();
  }

  get currentUser() {
    if (!this.CURRENT_USER) {
      this.CURRENT_USER = JSON.parse(localStorage.getItem('currentUser'));
    }
    return this.CURRENT_USER;
  }

  login(email: string, password: string): Observable<any> {
    // return this.httpClient.post<any>(this.REST('/auth/signin'), { email: email, password: password })
    //   .pipe(map((user: any) => {
    //     return user;
    //   }));
    return of({ 'id': 1, 'name': 'Dino da Silva Sauro', 'email': 'dino@mail.com', 'password': '123' });
  }

  /**
   * reseta login localStorage
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
    this.CURRENT_USER = null;
    console.log('currentUser: ', this.currentUser);
  }
}
