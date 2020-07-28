import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { ColorTypeEnum } from 'study-core-ngx';



@Injectable({ providedIn: 'root' })
export class UiSnackBarService {

  constructor(
    public matSnackBar: MatSnackBar,
  ) {
  }

  show(msg: string, action?: string): Observable<any> {
    return this.showGeneric(msg, action, null);
  }

  success(msg: string, action?: string): Observable<any> {
    return this.showGeneric(msg, action, ColorTypeEnum.SUCCESS);
  }

  danger(msg: string, action?: string): Observable<any> {
    return this.showGeneric(msg, action, ColorTypeEnum.DANGER);
  }

  warning(msg: string, action?: string): Observable<any> {
    return this.showGeneric(msg, action, ColorTypeEnum.WARNING);
  }

  info(msg: string, action?: string): Observable<any> {
    return this.showGeneric(msg, action, ColorTypeEnum.INFO);
  }

  private showGeneric(msg: string, action?: string, colorType?: ColorTypeEnum, config?: MatSnackBarConfig) {
    if (!config) {
      config = new MatSnackBarConfig();
      config.duration = action ? 5000 : 2000;
      config.panelClass = `mat-snackbar-${colorType}`; // css em _mat-snack-bar.scss
    }
    const snackBarRef = this.matSnackBar.open(msg, action, config);
    return snackBarRef.afterDismissed();
  }
}
