import { AfterContentInit, Component, ContentChild, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material';
import { FormComponent } from '../../form.component';

@Component({
  selector: 'app-mat-form-field',
  templateUrl: './mat-form-field.component.html',
  styleUrls: ['./mat-form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatFormFieldComponent extends FormComponent implements AfterContentInit {

  @ViewChild(MatFormField, {static: true}) matFormField: MatFormField;
  @ContentChild(MatFormFieldControl, {static: false}) control: MatFormFieldControl<any>;
  @ContentChild(FormControlName, {static: true}) formControlName: FormControlName;

  constructor() {
    super();
  }

  ngAfterContentInit(): void {
    this.matFormField._control = this.control;
  }

}
