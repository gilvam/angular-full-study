import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CoreFormErrorService {
  private formErrors = {};
  private defaultMessage = 'Campo inválido';
  private formGroupTm: FormGroup;

  // return list of error messages
  private validationMessages = (key, paramError: any) => {

    const messages = {
      'Mask error': '', // mensagem para o Mask error
      required: `Campo requerido`,
      email: `Email inválido`,
      notEqual: `Confirmação diferente`,
      minlength: `O número mínimo de caracteres é ${ paramError.requiredLength }`,
      maxlength: `O número máximo permitido de caracteres é ${ paramError.requiredLength }`,
      pattern: `Campo inválido`,

      // novos padroes de mensagem
      invalid: 'Campo inválido',
      invalidCharacters: `Caracterer '${ paramError }' inválido`,
    };
    // console.log(
    //   ''
    //   , ' | key', key
    //   , ' | paramError:', paramError
    //   , ' | ', messages[key],
    // );

    // retorna mensagem padrao, caso nao exista retorna a mensagem do custom validator, ex: core-validators.custom
    return messages[key] ? messages[key] : paramError;
  };

  private validateAllFormFields(formGroup: any) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        // control.markAsTouched({ onlySelf: true });
        control.markAsDirty();
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }

  private getValidateFormControlName(nameInput, fc: FormControl | FormControlName, checkDirty?: boolean) {
    // console.log('fc: ', fc.invalid, fc);
    if (fc && fc.invalid) {
      if (checkDirty) {
        if (this.formGroupTm) {
          this.validateAllFormFields(this.formGroupTm);
        }
      }

      // console.log('fc.dirty || fc.touched: ', fc.dirty || fc.touched);
      // if (fc.dirty || fc.touched) {
      this.getValidateFormControl(fc, nameInput);
      // console.log('nameInput, fc: ', nameInput, fc);
      // }
    } else {
      delete this.formErrors[nameInput];
      delete fc['coreError'];
    }
  }

  private getValidateFormGroup(fToValidate, checkDirty?: boolean) {
    Object.keys(fToValidate.controls).forEach(nameInput => {
      const formControl = fToValidate.get(nameInput);

      if (formControl instanceof FormGroup) {       // recursividade se um formulario tem um objeto com mais valores
        this.validateForm(formControl, checkDirty);
      } else if (formControl.validator) {           // se existe um validator para o campo
        this.getValidateFormControlName(nameInput, formControl, checkDirty);
      }
    });
  }

  private getValidateFormControl(formAny: FormControl | FormControlName, nameInput: string) {
    let messageLast = '';
    if (formAny.errors) {
      Object.keys(formAny.errors).forEach((key) => {
        // console.log('key: ', key);
        const messErr = this.validationMessages(key, formAny.getError(key));
        messageLast = messageLast ? `${ messageLast }. ` : messageLast;
        messageLast += messErr;
        // console.log('key: ', key, ' | ', formAny.getError(key), ' | ', messErr);
      });
      this.formErrors[nameInput] = messageLast || this.defaultMessage;
      formAny['coreError'] = this.formErrors[nameInput];  // mensagem de erro de validação na input (formAny)
    }
  }

  // Validate form instance
  validateForm(groupOrName: FormGroup | FormControlName, checkDirty?: boolean) {
    if (groupOrName instanceof FormGroup) {               // se os erros de validação  são de um formulário inteiro
      this.formGroupTm = groupOrName;
      this.getValidateFormGroup(groupOrName, checkDirty);
    } else if (groupOrName instanceof FormControlName) {    // se os erros de validação são apenas os campos separados
      this.getValidateFormControlName(groupOrName.name, groupOrName, checkDirty);
    }
  }

  validateFormControl(formControl: FormControl, nameInput: string) {
    setTimeout(() => this.getValidateFormControl(formControl, nameInput));
  }
}
