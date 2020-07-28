import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MoreSubActions } from 'study-core-ngx';

@Component({
  selector: 'ui-dialog-action-simple',
  templateUrl: './dialog-action-simple.component.html',
  styleUrls: ['./dialog-action-simple.component.scss'],
})
export class DialogActionSimpleComponent {

  @Output() changeCheck = new EventEmitter();
  subActions: Array<MoreSubActions>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.subActions = data.subActions ? data.subActions : [];
  }
}
