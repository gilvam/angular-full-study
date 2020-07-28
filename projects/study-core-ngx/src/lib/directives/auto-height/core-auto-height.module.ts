import { NgModule } from '@angular/core';
import { CoreAutoHeightDirective } from './core-auto-height.directive';


@NgModule({
  declarations: [
    CoreAutoHeightDirective,
  ],
  exports: [
    CoreAutoHeightDirective,
  ]
})
export class CoreAutoHeightModule {
}
