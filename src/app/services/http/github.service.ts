import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from '../generic.service';
import { HttpParams } from '@angular/common/http';
import { GithubRepoModel } from '../../models/github-repo.model';

@Injectable()
export class GithubService extends GenericService<GithubRepoModel> {

  findGraphQL(params: HttpParams, ...moreParams: Array<{ [key: string]: string | number } | HttpParams>): Observable<GithubRepoModel> {
    return this.httpClient.get<GithubRepoModel>('https://api.github.com/users/gilvam/repos', { params: this.getParams(params, moreParams) });
  }

}
