import { Injector } from '@angular/core';

export class CoreInjector {

  private _injector: Injector;


  get injector(): Injector {
    return this._injector;
  }

  set injector(value: Injector) {
    this._injector = value;
  }
}
