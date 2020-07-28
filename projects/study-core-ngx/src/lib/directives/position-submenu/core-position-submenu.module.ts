import { NgModule } from '@angular/core';
import { CorePositionSubmenuDirective } from './core-position-submenu.directive';

@NgModule({
  declarations: [
    CorePositionSubmenuDirective,
  ],
  exports: [
    CorePositionSubmenuDirective,
  ]
})
export class CorePositionSubmenuModule {
}
