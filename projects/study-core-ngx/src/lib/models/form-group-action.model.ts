import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { FormGroupActionRsqlParser } from '../util/form-group-action-rsql-parser';

/**
 * Transforma httParams normais no tipo RSQL - PARSER ( verificar o  FormGroupActionRsqlParser )
 */
export class FormGroupActionModel extends FormGroupActionRsqlParser {

  public formGroup: FormGroup;

  constructor(formGroup: FormGroup) {
    super(formGroup);
    this.formGroup = formGroup;
  }

  private getFormValues(formGroup: FormGroup | FormArray, T?, obj?: any): any {

    // transforma formGroup em um array de objeto chave valor
    obj = obj ? obj : new (T ? T : Object);
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        if (field !== 'passwordConfirm') { // remove obj com key 'passwordConfirm' se existe
          obj[field] = control.value;
        }
      } else if (control instanceof FormGroup) {
        this.getFormValues(control, T, obj);
      } else if (control instanceof FormArray) {
        this.getFormValues(control, T, obj);
      }
    });

    // remove variáveis em branco / objeto com chave e sem valor
    const objBlank = {};
    Object.keys(obj).map((value) => {
      const name = value.replace('_', '');
      if (obj[name]) {
        objBlank[name] = obj[name];
      }
    });

    return objBlank;
  }


  /**
   * Transforma httpParams normais para o padrão RSQL de acordo com a função escolhida em FormGroupActionRsqlParser
   * @param httpParams
   * exemplo: name like -> https://...?search=name==*ric*
   */
  public toHttpParams(httpParams?: HttpParams): HttpParams {
    let params = new HttpParams();

    // pega cópia do formGroup ativo com as mudanças Rsql sem alterar o form original
    const formGroupRSQL: FormGroup = this.getRsqlParser();

    // adiciona novos parametros com RSQL
    if (formGroupRSQL) {
      const fg = this.getFormValues(formGroupRSQL);
      let filter = '';

      Object.keys(fg).forEach((field, i) => {
        if (i !== 0) {
          filter = filter.concat(';');
        }
        filter = filter.concat(String(field));      // key
        filter = filter.concat(String(fg[field]));  // val
      });
      if (filter) {
        params = params.set('search', filter);
      }
    }

    // adiociona parametros antigos
    if (httpParams) {
      httpParams.keys().map(item => {
        params = params.set(item, httpParams.get(item));
      });
    }
    return params;
  }
}
