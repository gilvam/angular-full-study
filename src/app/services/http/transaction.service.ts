import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../../models/transaction.model';
import { PageModel } from 'study-core-ngx';

@Injectable()
export class TransactionService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<PageModel<Transaction>[]> {
    return this.httpClient.get<PageModel<Transaction>[]>('../assets/data/transactions.json')
      .pipe(
        map((page: PageModel<Transaction>[]) => page)
      );
  }
}
