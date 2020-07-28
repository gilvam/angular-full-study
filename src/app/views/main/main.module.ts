import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule,
  ],
  declarations: [
    LoginComponent,
    SearchComponent,
  ],
  exports: [
    LoginComponent,
    SearchComponent,
  ],
  entryComponents: [
  ],
})
export class MainModule {
}
