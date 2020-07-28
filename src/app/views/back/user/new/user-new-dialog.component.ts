import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BaseComponent } from '../../../../_shared/base.component';
import { Validators } from '@angular/forms';
import { CoreValidators } from 'study-core-ngx';

@Component({
  selector: 'app-user-new-dialog',
  templateUrl: './user-new-dialog.component.html',
})
export class UserNewDialogComponent extends BaseComponent implements OnInit {

  hidePassNew: boolean;
  hidePassConf: string;

  constructor(public dialogRef: MatDialogRef<UserNewDialogComponent>) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: [null, [CoreValidators.passwordMatch]],
      passwordConfirm: [null, [CoreValidators.passwordMatchConfirm, Validators.minLength(3)]],
      mobile: [''],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (!this.formGroup.valid) {
      this.formCheckErrors(); // mostrar todos os erros
      return;
    }

    this.dialogRef.close(this.formGroup);
  }

}
