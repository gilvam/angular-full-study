import { NgModule } from '@angular/core';
import { MatNavListSubComponent } from './mat-nav-list-sub.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatListModule } from '@angular/material';
import { CorePositionSubmenuModule } from 'study-core-ngx';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    // material
    MatIconModule,
    MatListModule,

    // study-core
    CorePositionSubmenuModule,
  ],
  declarations: [
    MatNavListSubComponent,
  ],
  entryComponents: [
    MatNavListSubComponent,
  ],
  exports: [
    MatNavListSubComponent,
  ],
})
export class UiMatNavListSubModule {
}
