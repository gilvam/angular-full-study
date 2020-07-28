import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatCheckbox } from '@angular/material';
import { MenuActionCheck, MoreSubActions } from 'study-core-ngx';

@Component({
  selector: 'ui-dialog-action',
  templateUrl: './dialog-action.component.html',
  styleUrls: ['./dialog-action.component.scss'],
})
export class DialogActionComponent {

  // em menu-action-more-vertical.component.ts | dialogRef.componentInstance.changeCheck.subscribe...
  @Output() changeCheck = new EventEmitter();
  subActions: Array<MoreSubActions>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.subActions = data.subActions ? data.subActions : [];
  }

  clickCheck(matCheckbox: MatCheckbox) {
    this.changeCheck.emit(new MenuActionCheck(matCheckbox.checked));
  }

}
