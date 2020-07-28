import { NgModule } from '@angular/core';
import { AnimationLoadingComponent } from './animation-loading.component';
import { AnimationLoadingStore } from '../../stores/animation-loading.store';
import { MatProgressSpinnerModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AnimationLoadingInterceptor } from '../../interceptors/animation-loading.interceptor';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,

    // material
    MatProgressSpinnerModule,
  ],
  declarations: [
    AnimationLoadingComponent,
  ],
  exports: [
    AnimationLoadingComponent,
  ],
  providers: [
    AnimationLoadingStore,
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AnimationLoadingInterceptor },
  ]
})
export class UiAnimationLoadingModule {
}
