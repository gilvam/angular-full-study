import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export let INJECTOR: Injector;

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  providers: [],
})
export class InjectorModule {
  constructor(private injector: Injector) {
    INJECTOR = this.injector;
  }
}
