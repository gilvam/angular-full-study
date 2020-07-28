import { NgModule } from '@angular/core';
import { InnerLoadingComponent } from './inner-loading.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    InnerLoadingComponent,
  ],
  entryComponents: [
    InnerLoadingComponent,
  ],
  exports: [
    InnerLoadingComponent,
  ],
})
export class UiInnerLoadingModule {
}
