import { Injectable } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material';
import { DialogVerificationComponent } from '../components/dialog/verification/dialog-verification.component';
import { Observable } from 'rxjs';
import { ColorTypeEnum } from 'study-core-ngx';

@Injectable({ providedIn: 'root' })
export class UiDialogVerificationService {

  constructor(
    public matDialog: MatDialog,
  ) {
  }

  show(title: string, msg: string, btnAction?: string, btnCancel?: string): Observable<MatDialogClose> {
    return this.showGeneric(title, msg, btnAction, btnCancel, null);
  }

  success(title: string, msg: string, btnAction?: string, btnCancel?: string): Observable<MatDialogClose> {
    return this.showGeneric(title, msg, btnAction, btnCancel, ColorTypeEnum.SUCCESS);
  }

  danger(title: string, msg: string, btnAction?: string, btnCancel?: string): Observable<MatDialogClose> {
    return this.showGeneric(title, msg, btnAction, btnCancel, ColorTypeEnum.DANGER);
  }

  warning(title: string, msg: string, btnAction?: string, btnCancel?: string): Observable<MatDialogClose> {
    return this.showGeneric(title, msg, btnAction, btnCancel, ColorTypeEnum.WARNING);
  }

  info(title: string, msg: string, btnAction?: string, btnCancel?: string): Observable<MatDialogClose> {
    return this.showGeneric(title, msg, btnAction, btnCancel, ColorTypeEnum.INFO);
  }

  private showGeneric(title: string, msg: string, btnAction?: string, btnCancel?: string, colorType?: ColorTypeEnum) {
    const dialogRef = this.matDialog.open(DialogVerificationComponent, {
      data: { title: title, description: msg, btnAction: btnAction, btnCancel: btnCancel, colorType: colorType }
    });
    return dialogRef.afterClosed();
  }
}
