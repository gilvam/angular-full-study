import { NgModule } from '@angular/core';
import { CorePositionByElementDirective } from './core-position-by-element.directive';

@NgModule({
  declarations: [
    CorePositionByElementDirective,
  ],
  exports: [
    CorePositionByElementDirective,
  ]
})
export class CorePositionByElementModule {
}
