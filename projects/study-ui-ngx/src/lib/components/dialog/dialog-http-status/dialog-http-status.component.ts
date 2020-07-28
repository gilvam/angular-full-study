import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ui-dialog-http-status',
  templateUrl: './dialog-http-status.component.html',
  styleUrls: ['./dialog-http-status.component.scss'],
})
export class DialogHttpStatusComponent {

  httpError: HttpErrorResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.httpError = data;
  }

}
