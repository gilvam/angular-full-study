import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebitListComponent } from './debit/list/debit-list.component';
import { UserListComponent } from './user/list/user-list.component';
import { UserDetailComponent } from './user/detail/user-detail.component';
import { UserDetailMoreComponent } from './user/detail/more/user-detail-more.component';
import { TransactionListComponent } from './transaction/list/transaction-list.component';
import { GroupListComponent } from './group/list/group-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  // debits
  { path: 'debits', component: DebitListComponent, data: { title: 'débitos' } },

  // users
  { path: 'users', component: UserListComponent, data: { title: 'usuários' } },
  { path: 'users/:id', component: UserDetailComponent, data: { title: 'detalhado' } },
  { path: 'users/:id/more', component: UserDetailMoreComponent, data: { title: 'mais informação' } },

  // transactions
  { path: 'transactions', component: TransactionListComponent, data: { title: 'transações' } },

  // group
  { path: 'groups', component: GroupListComponent, data: { title: 'grupos' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackRoutingModule {

}
