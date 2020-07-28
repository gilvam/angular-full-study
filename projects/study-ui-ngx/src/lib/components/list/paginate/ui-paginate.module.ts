import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPaginateComponent } from './ui-paginate.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiInnerLoadingModule } from '../../inner-loading/ui-inner-loading.module';
import { UiListMessageModule } from '../message/ui-list-message.module';
import { UiListModule } from '../ui-list/ui-list.module';
import { UiListCellModule } from '../ui-list-cell/ui-list-cell.module';

@NgModule({
  imports: [
    CommonModule,

    // material
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,

    // study-core

    // study-ui
    UiInnerLoadingModule,
    UiListMessageModule,

    // plugins
    FlexLayoutModule,
    InfiniteScrollModule,
    UiListModule,
    UiListCellModule,
  ],
  declarations: [
    UiPaginateComponent,
  ],
  entryComponents: [
    UiPaginateComponent,
  ],
  exports: [
    UiPaginateComponent,
  ],
})
export class UiPaginateModule {
}
