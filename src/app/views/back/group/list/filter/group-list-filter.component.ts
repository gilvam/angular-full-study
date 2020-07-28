import { Component, Inject } from '@angular/core';
import { BaseComponent } from '../../../../../_shared/base.component';
import { FormGroupActionModel } from 'study-core-ngx';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-list-filter',
  templateUrl: './group-list-filter.component.html'
})
export class GroupListFilterComponent extends BaseComponent {

  typeList = [
    { key: '', name: 'Todos' },
    { key: 'ACTIVE', name: 'Ativado' },
    { key: 'DISABLE', name: 'Desativado' },
    { key: 'DISABLE_CURRENT', name: 'Desativado recentementee' }
  ];

  constructor(
    private dialogRef: MatDialogRef<GroupListFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: FormGroup,
  ) {
    super();

    this.formGroup = data ? data : this.formBuilder.group({
      name: [''],
      type: [''],
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
