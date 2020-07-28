import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseComponent } from '../../../../_shared/base.component';
import { Validators } from '@angular/forms';
import { CoreValidators } from 'study-core-ngx';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
})
export class UserEditDialogComponent extends BaseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: UserModel,
  ) {
    super();
    this.form(this.data);
  }

  ngOnInit(): void {
  }

  private form(user: UserModel) {
    this.formGroup = this.formBuilder.group({
      id: [user.id],
      name: [user.name, Validators.required],
      email: [{ value: user.email, disabled: true }],
      password: [null, [CoreValidators.passwordMatch]],
      passwordConfirm: [null, [CoreValidators.passwordMatchConfirm, Validators.minLength(3)]],
      // profile: [user.profile, Validators.required]
      mobile: [user.mobile],
    }, { updateOn: 'blur' }); // atualiza os campos com validaçoes quando o seu valor sofre alteração e passa para o próximo
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
