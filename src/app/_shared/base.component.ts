import { INJECTOR } from './injector.module';
import { Router } from '@angular/router';
import { FormComponent } from './form.component';
import { UiDialogVerificationService, UiSnackBarService } from 'study-ui-ngx';
import { MenuActionStore } from './stores/menu-action.store';
import { SidenavEndStore } from './stores/sidenav-end.store';
import { SidenavStartStore } from './stores/sidenav-start.store';

export class BaseComponent extends FormComponent {

  protected coreRouter: Router;
  protected dialog: UiDialogVerificationService;
  protected snackBar: UiSnackBarService;
  protected menuActionStore: MenuActionStore;
  protected sidenavEndStore: SidenavEndStore;
  protected sidenavStartStore: SidenavStartStore;

  constructor() {
    super();
    this.coreRouter = INJECTOR.get<Router>(Router);
    this.dialog = INJECTOR.get<UiDialogVerificationService>(UiDialogVerificationService);
    this.snackBar = INJECTOR.get<UiSnackBarService>(UiSnackBarService);
    this.menuActionStore = INJECTOR.get<MenuActionStore>(MenuActionStore);
    this.sidenavEndStore = INJECTOR.get<SidenavEndStore>(SidenavEndStore);
    this.sidenavStartStore = INJECTOR.get<SidenavStartStore>(SidenavStartStore);
  }

}
