import { INJECTOR } from '../_shared/injector.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GenericHttpServiceBase } from './generic-http-service-base';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroupActionModel, PageModel } from 'study-core-ngx';

export class GenericService<T> extends GenericHttpServiceBase {

  protected httpClient: HttpClient;

  constructor() {
    super();
    this.httpClient = INJECTOR.get<HttpClient>(HttpClient);
  }

  /**
   * remove variaveis e valores em branco de um modelo
   */
  protected removeBlankVariables(object: T): any {
    const objTmp = {};
    Object.keys(object).map((value) => {
      const name = value.replace('_', '');
      if (object[name]) {
        objTmp[name] = object[name];
      }
    });
    return objTmp;
  }

  protected getFormValues(formGroup: FormGroup | FormArray, T?, obj?: T): T {
    obj = obj ? obj : new (T ? T : Object);
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        if (field !== 'passwordConfirm') {
          obj[field] = control.value;
        }
      } else if (control instanceof FormGroup) {
        this.getFormValues(control, T, obj);
      } else if (control instanceof FormArray) {
        this.getFormValues(control, T, obj);
      }
    });

    return obj;
  }

  protected parseToParams(httpParams: HttpParams, formGroupActionModel: FormGroupActionModel) {
    if (formGroupActionModel) {
      let tmp = this.getFormValues(formGroupActionModel.formGroup);
      tmp = this.removeBlankVariables(tmp);

      Object.keys(tmp).forEach(field => {
        httpParams = httpParams.set(String(field), String(tmp[field]));
      });

      return httpParams;
    }
    return null;
  }

  /**
   * Passa httpParams e outros parametros para httpParams
   * @param params
   * @param moreParams
   */
  protected getParams(params: HttpParams, moreParams: Array<{ [key: string]: string | number } | HttpParams>): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    moreParams.map(item => {
      if (item instanceof HttpParams) { // se param é um httpParams
        httpParams = item;
      } else { // se param é um objeto chave valor
        const key = Object.keys(item)[0]; // nome da key
        httpParams = httpParams.set(key, String(item[key]));
      }
    });

    if (params) {
      params.keys().map(item => {
        httpParams = httpParams.set(String(item), params.get(item));
      });
    }
    return httpParams;
  }

  public pastValues(formGroup: FormGroup, object: T) {

    Object.keys(formGroup.controls).forEach(item => {
      const formControl = formGroup.get(item);

      // recursividade se um formulario tem um objeto com mais valores
      if (formControl instanceof FormGroup) {
        this.pastValues(formControl, object);
      }
    });

    Object.keys(object).map((value) => {
      const name = value.replace('_', '');
    });
  }

  getLinkRESTEndPoint(): string {
    let endPoint = '';
    if (this.constructor && this.constructor.name) {
      endPoint = this.constructor.name.toLowerCase().replace('service', '');
    }
    return this.REST(endPoint);
  }

  insert(object: T): boolean {
    console.log('insert- object:', object);
    this.httpClient.post(this.getLinkRESTEndPoint(), object);
    return true;
  }

  create(form: FormGroup): Observable<any> {
    const obj = this.getFormValues(form, Object);
    return this.httpClient.post<T>(this.getLinkRESTEndPoint(), obj);
  }

  update(form: FormGroup): Observable<any> {
    const obj = this.getFormValues(form, Object);
    return this.httpClient.put<T>(`${ this.getLinkRESTEndPoint() }/${ obj['id'] }`, obj);
  }

  delete(id: number): Observable<any> {
    console.log('delete- id:', id);
    return this.httpClient.delete(`${ this.getLinkRESTEndPoint() }/${ id }`);
  }

  find(id: string): Observable<T> {
    return this.httpClient.get<T>(`${ this.getLinkRESTEndPoint() }/${ id }`);
  }

  findById(id: string): Observable<T> {
    return this.httpClient.get<T>(`${ this.getLinkRESTEndPoint() }/${ id }`);
  }

  findAll(params: HttpParams, ...moreParams: Array<{ [key: string]: string | number } | HttpParams>): Observable<PageModel<T>> {
    return this.httpClient.get<PageModel<T>>(this.getLinkRESTEndPoint(), { params: this.getParams(params, moreParams) });
  }
}
