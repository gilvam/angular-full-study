import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';


/**
 * RSQL - PARSER
 * https://github.com/jirutka/rsql-parser
 */
export class FormGroupActionRsqlParser {

  private _form: FormGroup;

  constructor(public formGroup: FormGroup) {
    this._form = this.copyForm(formGroup);
  }

  private copyForm(control: AbstractControl): any {
    if (control instanceof FormControl) {
      return new FormControl(control.value);
    } else if (control instanceof FormGroup) {
      const copy = new FormGroup({});
      Object.keys(control.getRawValue()).forEach(key => {
        copy.addControl(key, this.copyForm(control.controls[key]));
      });
      return copy;
    } else if (control instanceof FormArray) {
      const copy = new FormArray([]);
      control.controls.forEach(control => {
        copy.push(this.copyForm(control));
      });
      return copy;
    }
  }

  protected getRsqlParser(): FormGroup {
    return this._form;
  }

  /**
   * simplificando a consulta do valor no formGroup
   * @param key
   */
  protected v(key: string): any {
    return this._form.get(key).value;
  }

  protected setValue(key: string, newValue: string): any {
    if (this.v(key)) {
      return this._form.get(key).setValue(newValue);
    }
    return null;
  }

  /**
   *  is null
   * */
  isNull(key: string) {
    this.setValue(key, `=null=''`);
  }

  /**
   *  is not null
   * */
  isNotNull(key: string) {
    this.setValue(key, `=notnull=''`);
  }

  /**
   * equal to empty string
   */
  equalToEmptyString(key: string) {
    this.setValue(key, `==''"`);
  }

  /**
   * equal
   */
  equal(key: string) {
    this.setValue(key, `==${ this.v(key) }"`);
  }

  /**
   * like dem%
   */
  likeRigth(key: string) {
    this.setValue(key, `==${ this.v(key) }*"`);
  }

  /**
   * like %emo
   */
  likeLeft(key: string) {
    this.setValue(key, `==*${ this.v(key) }"`);
  }

  /**
   * like %em%
   */
  like(key: string) {
    this.setValue(key, `==*${ this.v(key) }*`);
  }

  /**
   * ignore case like %EM%
   */
  likeIgnoreCase(key: string) {
    this.setValue(key, `==^*${ this.v(key) }*"`);
  }


  /**
   *  not equal
   * */
  notEqual(key: string) {
    this.setValue(key, `!=${ this.v(key) }`);
  }

  /**
   *  in
   * */
  in(key: string) {
    this.setValue(key, `=in=(${ this.v(key) })`);
  }

  /**
   *  not in
   * */
  notIn(key: string) {
    this.setValue(key, `=out=(${ this.v(key) })`);
  }

  /**
   *  greater than
   * */
  greaterThan(key: string) {
    this.setValue(key, `>${ this.v(key) }`);
  }

  /**
   *  less than
   * */
  lessThan(key: string) {
    this.setValue(key, `<${ this.v(key) }`);
  }

  /**
   *  greater than or equal
   * */
  greaterThanOrEqual(key: string) {
    this.setValue(key, `>=${ this.v(key) }`);
  }

  /**
   *  less than or equal
   * */
  lessThanOrEqual(key: string) {
    this.setValue(key, `<=${ this.v(key) }`);
  }



// http://localhost:9090/user?page=0&search=name==*a*&size=20

}
