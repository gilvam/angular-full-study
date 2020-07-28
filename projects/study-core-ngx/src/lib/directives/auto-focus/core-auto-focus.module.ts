import { NgModule } from '@angular/core';
import { CoreAutoFocusDirective } from './core-auto-focus.directive';

@NgModule({
  declarations: [
    CoreAutoFocusDirective,
  ],
  exports: [
    CoreAutoFocusDirective,
  ]
})
export class CoreAutoFocusModule {
}
