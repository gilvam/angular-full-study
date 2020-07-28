import { Component, Inject } from '@angular/core';
import { BaseComponent } from '../../../../_shared/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroupActionModel } from 'study-core-ngx';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list-filter',
  templateUrl: './user-list-filter.component.html'
})
export class UserListFilterComponent extends BaseComponent {

  constructor(
    private dialogRef: MatDialogRef<UserListFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: FormGroup,
  ) {
    super();

    this.formGroup = data ? data : this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: ['']
    });
  }

  find(): void {
    this.menuActionStore.updateFilterFormValues(new FormGroupActionModel(this.formGroup));
    this.cancel();
  }

  cancel(): void {
    this.dialogRef.close(this.formGroup);
  }

}
