import { NgModule } from '@angular/core';
import { DebitListComponent } from './debit/list/debit-list.component';
import { BackRoutingModule } from './back-routing.module';
import { UserDetailMoreComponent } from './user/detail/more/user-detail-more.component';
import { UserDetailComponent } from './user/detail/user-detail.component';
import { UserListComponent } from './user/list/user-list.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { FilesComponent } from './files/files.component';
import { TransactionListComponent } from './transaction/list/transaction-list.component';
import { GroupListComponent } from './group/list/group-list.component';
import { UserNewDialogComponent } from './user/new/user-new-dialog.component';
import { UserEditDialogComponent } from './user/edit/user-edit-dialog.component';
import { UiPaginateModule } from 'study-ui-ngx';

@NgModule({
  imports: [
    SharedModule,
    BackRoutingModule,

    // study-core

    // study-ui
    UiPaginateModule,

    // plugins
    // InfiniteScrollModule,
  ],
  declarations: [
    DebitListComponent,
    UserDetailMoreComponent,
    UserDetailComponent,
    UserListComponent,
    FilesComponent,
    TransactionListComponent,
    GroupListComponent,

    // dialog
    UserNewDialogComponent,
    UserEditDialogComponent,
  ],
  entryComponents: [
    // dialog
    UserNewDialogComponent,
    UserEditDialogComponent,
  ],
  exports: [],
})
export class BackModule {
}
