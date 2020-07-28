import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogButtonModel } from '../../../models/dialog-button.model';
import { DialogBtnTypeEnum, ColorTypeEnum } from 'study-core-ngx';

@Component({
  selector: 'ui-dialog-verification',
  templateUrl: './dialog-verification.component.html',
  styleUrls: ['./dialog-verification.component.scss'],
})
export class DialogVerificationComponent {

  btnAction: DialogButtonModel;
  btnCancel: DialogButtonModel;
  iconName: string;

  constructor(
    public dialogRef: MatDialogRef<DialogVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // btn cancel
    this.btnCancel = new DialogButtonModel(data.btnCancel, true, DialogBtnTypeEnum.BTN_CANCEL_TEXT);

    // btn action
    this.btnAction = new DialogButtonModel(data.btnAction, true, DialogBtnTypeEnum.BTN_CONFIRM_TEXT);

    this.iconName = this.getNameIcon(data.colorType);
  }

  getNameIcon(colorType: ColorTypeEnum) {
    switch (colorType) {
      case 'success': return 'check_circle';
      case 'danger': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return null;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
