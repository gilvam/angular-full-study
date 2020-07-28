import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupModel } from '../../models/group.model';
import { PageModel } from 'study-core-ngx';

@Injectable()
export class GroupService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<PageModel<GroupModel>[]> {
    return this.httpClient.get<PageModel<GroupModel>[]>('../assets/data/groups.json')
      .pipe(
        map((page: PageModel<GroupModel>[]) => page)
      );
  }
}
