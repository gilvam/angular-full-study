import { NgModule } from '@angular/core';
import { NetConnectionComponent } from './net-connection.component';
import { AnimationLoadingStore } from '../../stores/animation-loading.store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AnimationLoadingInterceptor } from '../../interceptors/animation-loading.interceptor';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    // material
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    NetConnectionComponent,
  ],
  exports: [
    NetConnectionComponent,
  ],
  providers: [
    AnimationLoadingStore,
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AnimationLoadingInterceptor },
  ]
})
export class UiNetConnectionModule {
}
