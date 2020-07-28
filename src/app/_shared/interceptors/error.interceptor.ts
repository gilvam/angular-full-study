import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/http/auth.service';
import { MatDialog } from '@angular/material';
import { DialogHttpStatusComponent } from 'study-ui-ngx';
import { BaseComponent } from '../base.component';

@Injectable()
export class ErrorInterceptor extends BaseComponent implements HttpInterceptor {

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    // UiDialogHttpStatusModule
  ) {
    super();
  }

  private genericError(err: HttpErrorResponse) {
    const e = new HttpErrorResponse({
      error: err.error,
      status: Number(err.url.replace('https://httpstat.us/', '')),
      headers: err.headers,
      statusText: err.statusText,
      url: err.url,
    });
    this.matDialog.open(DialogHttpStatusComponent, { data: e });
  }

  private handle0(err: HttpErrorResponse) {
    const e = {
      status: err.status, error: 'Conexão back-end', message: 'API REST back-end não iniciado ou incorreto',
    };
    this.matDialog.open(DialogHttpStatusComponent, { data: e });
  }

  private handle422(err: HttpErrorResponse) {
    const e = {
      timestamp: 1562352065147,
      status: Number(err.url.replace('https://httpstat.us/', '')),
      error: 'Erro de validação',
      message: 'Campos',
      path: '/api/logs/save',
      errors: [
        { fieldName: 'type', message: 'valor mínimo é 1' },
        { fieldName: 'path', message: 'não pode estar vazio' },
        { fieldName: 'user', message: 'não pode estar vazio' },
      ],
    };
    this.matDialog.open(DialogHttpStatusComponent, { data: e });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 0: // se back-end não iniciado, ocorre erro com status 0
            this.handle0(err);
            break;
          case 401:
            this.genericError(err);
            break;
          case 422: // errors field
            this.handle422(err);
            break;
          default:
            this.genericError(err);
            break;
        }
        // if (status >= 300 && status <= 308)
        // if (status >= 400 && status <= 451)
        // if (status >= 500 && status <= 511)

        const error = err.error.message || err.statusText;
        return throwError(error);
      },
    ));
  }
}
