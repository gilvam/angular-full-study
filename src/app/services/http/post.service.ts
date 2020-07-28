import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GenericService } from '../generic.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PostService extends GenericService<any> {

  host = 'https://jsonplaceholder.typicode.com';

  constructor(protected router: Router) {
    super();
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${ this.host }/posts`);
  }

  getById(id: string | number): Observable<any> {
    return this.httpClient.get(`${ this.host }/posts/${ id }`);
  }

  getALlByUser(userId: string): Observable<any> {
    const httpParams = new HttpParams().set('userId', userId);
    return this.httpClient.get(`${ this.host }/posts`, { params: httpParams });
  }

}
