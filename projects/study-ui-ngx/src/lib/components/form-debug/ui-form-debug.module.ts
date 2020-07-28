import { NgModule } from '@angular/core';
import { FormDebugComponent } from './form-debug.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormDebugComponent,
  ],
  entryComponents: [
    FormDebugComponent,
  ],
  exports: [
    FormDebugComponent,
  ],
})
export class UiFormDebugModule {
}
