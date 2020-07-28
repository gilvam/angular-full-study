import { INJECTOR } from './injector.module';
import { AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreFormErrorService } from 'study-core-ngx';
import * as deepStrictEqual from 'deep-equal';

export class FormComponent implements AfterContentInit {

  private formValuesOld;
  protected formBuilder: FormBuilder;
  protected formErrorService: CoreFormErrorService;
  formGroup: FormGroup;

  constructor() {
    this.formBuilder = INJECTOR.get<FormBuilder>(FormBuilder);
    this.formErrorService = INJECTOR.get<CoreFormErrorService>(CoreFormErrorService);
  }

  ngAfterContentInit(): void {

    setTimeout(() => {
      if (this.formGroup) {
        this.formGroup.valueChanges.subscribe((changes) => { // mostrar erro por campo durante a mudança de valores na input
          // se valores dos objetos é diferente -> https://basarat.gitbooks.io/typescript/docs/javascript/equality.html
          if (!deepStrictEqual(this.formValuesOld, changes)) {
            this.formErrorService.validateForm(this.formGroup); // mostrar erro por campo
            this.formValuesOld = changes;
          }
        });
      }

      this.formCheckErrorsInit();
    });
  }

  /**
   * popula os erros que podem ser mostrados quando as inputs forem dirty ( entrar e sair do campo )
   */
  private formCheckErrorsInit() {
    setTimeout(() => {
      this.formErrorService.validateForm(this.formGroup);
    });
  }

  /**
   * popula os erros e mostra todos eles (dirty: true)
   */
  protected formCheckErrors() {
    this.formErrorService.validateForm(this.formGroup, true);
  }


}
