import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpStatusTestService {
  constructor(private httpClient: HttpClient) {
  }

  getStatusTest(val: number): Observable<any> {
    return this.httpClient.get<any>(`https://httpstat.us/${ val }`)
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }
}
