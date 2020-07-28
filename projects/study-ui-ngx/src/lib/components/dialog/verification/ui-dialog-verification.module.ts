import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { DialogVerificationComponent } from './dialog-verification.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,

    // material
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    DialogVerificationComponent,
  ],
  entryComponents: [
    DialogVerificationComponent,
  ],
  exports: [
    // DialogVerificationComponent,
  ],
})
export class UiDialogVerificationModule {
}
