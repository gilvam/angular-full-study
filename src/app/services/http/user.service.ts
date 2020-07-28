import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { GenericService } from '../generic.service';
import { find, map, switchMap } from 'rxjs/operators';
import { PageModel } from 'study-core-ngx';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UserService extends GenericService<UserModel> {

  public getUserByEmail(email: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.REST('/findByEmail', email));
  }

  public getMe(): Observable<UserModel> {
    return this.httpClient.get<any>(this.REST('/me'));
  }

  getAll(): Observable<PageModel<UserModel>[]> {
    return this.httpClient.get<PageModel<UserModel>[]>('../assets/data/users.json')
      .pipe(
        map((page: PageModel<UserModel>[]) => page),
      );
  }

  getFakeUser() {
    return this.httpClient.get<any[]>(this.REST('/userFake'));
  }

  findById(id): Observable<UserModel> {
    return this.httpClient.get<UserModel>('../assets/data/users.json')
      .pipe(
        switchMap((page: any) => {
          let userList: UserModel[];
          userList = [];
          page.map(item =>
            item.content.map((user: UserModel) =>
              userList.push(user),
            ),
          );
          return userList;
        }),
        find(user => Number(user.id) === Number(id)),
      );
  }

  findByEmail(email: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.getLinkRESTEndPoint(), { params: new HttpParams().set('search', `email==*${ email }*`) })
      .pipe(map((response: any) => {
        return response.content && response.content.length ? response.content[0] : null;
      }));
  }

}
