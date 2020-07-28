import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/main/login/login.component';
import { AuthGuard } from 'study-core-ngx';

const routes: Routes = [
  { path: '', redirectTo: '/back/users', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'back', loadChildren: () => import('./views/back/back.module').then(m => m.BackModule), canActivate: [AuthGuard] },
  { path: 'doc', loadChildren: () => import('./views/_doc/doc.module').then(m => m.DocModule), canActivate: [AuthGuard] },
  { path: 'main', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  routes = routes;
}
