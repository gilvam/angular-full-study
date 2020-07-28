import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldComponent } from './components/mat-form-field/mat-form-field.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TransactionService } from '../services/http/transaction.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GroupService } from '../services/http/group.service';
import { MobxAngularModule } from 'mobx-angular';
import { MenuActionComponent } from './components/menu-action/menu-action.component';
import { GroupListFilterComponent } from '../views/back/group/list/filter/group-list-filter.component';
import { SidenavEndComponent } from './components/sidenav-end/sidenav-end.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserListFilterComponent } from '../views/back/user/filter-menu-action/user-list-filter.component';
import { CoreAutoFocusModule, CoreAutoHeightModule } from 'study-core-ngx';
import {
  UiFormDebugModule,
  UiInnerLoadingModule,
  UiListCellModule,
  UiListModule,
  UiMatNavListSubModule,
  UiMatSelectSearchModule,
  UiMenuActionMoreVerticalModule,
  UiDialogHttpStatusModule,
  UiNetConnectionModule,
} from 'study-ui-ngx';
import * as moment from 'moment';
import { SidenavStartComponent } from './components/sidenav-start/sidenav-start.component';
import { MenuBackComponent } from './components/sidenav-start/menu-back/menu-back.component';
import { RouterModule } from '@angular/router';
import { MenuCheckoutComponent } from './components/sidenav-start/menu-checkout/menu-checkout.component';
import { MenuBottomComponent } from './components/menu-bottom/menu-bottom.component';

moment.locale('pt-BR');

const ACTION_FILTERS: Array<any> = [
  GroupListFilterComponent,
  UserListFilterComponent,
];

const SIDENAV_START: Array<any> = [
  MenuBackComponent,
  MenuCheckoutComponent
];

/**
 *
 * Módulo de componentes a serem compartilhados
 * por todos os outros módulos.
 *
 */
@NgModule({
  declarations: [
    ACTION_FILTERS,
    SIDENAV_START,
    // components
    MenuActionComponent,
    MenuBottomComponent,
    SidenavStartComponent,
    SidenavEndComponent,
    MatFormFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    RouterModule,

    // study-core
    CoreAutoHeightModule,
    CoreAutoFocusModule,

    // study-ui
    UiInnerLoadingModule,
    UiMenuActionMoreVerticalModule,
    UiMatNavListSubModule,
    UiMatSelectSearchModule,
    UiFormDebugModule,
    UiListModule,
    UiListCellModule,
    UiDialogHttpStatusModule,
    UiNetConnectionModule,

    // modules
    MaterialModule,

    // plugins
    TextMaskModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
    NgxDaterangepickerMd.forRoot({
      applyLabel: 'OK',
      format: 'DD-MM-YYYY',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
    }),
    MobxAngularModule,
    InfiniteScrollModule,
    UiMatNavListSubModule,
    UiNetConnectionModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    RouterModule,
    ACTION_FILTERS,
    SIDENAV_START,

    // study-core
    CoreAutoHeightModule,
    CoreAutoFocusModule,

    // study-ui
    UiInnerLoadingModule,
    UiMenuActionMoreVerticalModule,
    UiMatNavListSubModule,
    UiMatSelectSearchModule,
    UiFormDebugModule,
    UiListModule,
    UiListCellModule,
    UiDialogHttpStatusModule,

    // modules
    MaterialModule,

    // component
    MenuActionComponent,
    MenuBottomComponent,
    SidenavStartComponent,
    SidenavEndComponent,
    MatFormFieldComponent,

    // directives

    // plugins
    TextMaskModule,
    FlexLayoutModule,
    NgxMaskModule,
    NgxPermissionsModule,
    NgxDaterangepickerMd,
    MobxAngularModule,
    InfiniteScrollModule,
  ],
  providers: [
    TransactionService,
    GroupService,
    // FormGroupService,
  ],
  entryComponents: [
    ACTION_FILTERS,
    SIDENAV_START,
  ],
  bootstrap: []
})
export class SharedModule {
}
