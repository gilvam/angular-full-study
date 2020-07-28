import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Debit } from '../../models/debit.model';
import { PageModel } from 'study-core-ngx';

@Injectable()
export class DebitService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<PageModel<Debit>[]> {
    return this.httpClient.get<PageModel<Debit>[]>('../assets/data/transactions.json')
      .pipe(
        map((page: PageModel<Debit>[]) => page)
      );
  }
}
