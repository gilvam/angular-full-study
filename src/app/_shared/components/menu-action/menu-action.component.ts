import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuActionStore } from '../../stores/menu-action.store';
import { NavigationStart, Router } from '@angular/router';
import { MenuActionCheck, MenuActionMoreOption, MoreSubActions, DialogPanelClassEnum } from 'study-core-ngx';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrls: ['./menu-action.component.scss']
})
export class MenuActionComponent implements AfterViewInit, OnDestroy {

  @ViewChild('filter', { read: ViewContainerRef, static: true }) filter;
  private componentRef: ComponentRef<any>;
  private routerSubscription;
  private formGroupDialog: FormGroup = null;

  isDialog: boolean = null;
  subActions: Array<MoreSubActions>; // usado para modal ser chamda separadamente

  constructor(
    public menuActionStore: MenuActionStore,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private matDialog: MatDialog,
  ) {

    /**
     * ao trocar de rota, limpa todos os dados referentes ao menuActionStore
     */
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.removeComponent();
      }
    });
  }

  ngAfterViewInit(): void {
    this.menuActionStore.onUpdate.subscribe(() => {
      if (this.menuActionStore) {
        /**
         * subActions para o modal por cima do menu principal
         */
        if (this.menuActionStore.subActionList) {
          this.subActions = this.menuActionStore.subActionList;
        }
      }
    });

    this.menuActionStore.onOpenedSubAction.subscribe((opened: boolean) => {
      this.isDialog = opened;
    });
  }

  ngOnDestroy() {
    this.removeComponent();
  }

  search() {
    console.log('this.formGroupDialog: ', this.formGroupDialog);

    this.matDialog.open(this.menuActionStore.component, {
      data: this.formGroupDialog,
      panelClass: DialogPanelClassEnum.all,
      position: { top: '0px' }
    })
      .afterClosed()
      .subscribe((formGroup: FormGroup) => {
        this.formGroupDialog = formGroup;
      })
    ;
  }


  /**
   * remove o component criado anteriormente
   */
  removeComponent() {
    if (this.filter) {
      this.filter.clear();
    }
    if (this.menuActionStore) {
      this.menuActionStore.clear();
    }

    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.formGroupDialog = null;
  }

  /**
   * Atualiza subscribe do btnMoreVertical quando recebe um click
   */
  menuMoreOptionListClick(item: MenuActionMoreOption) {
    this.menuActionStore.updateMoreOptions(item);
  }

  /**
   * Atualiza subscribe do btnMoreVertical quando o checkbox do dialog action é clicado
   */
  menuMoreOptionListCheck(item: MenuActionCheck) {
    this.menuActionStore.updateMoreOptions(item);
  }

  /**
   * Atualiza subscribe do btnMoreVertical quando o dialog é fechado com o click de um btn com alguma ação ( menos o close x )
   */
  menuMoreOptionListClosed(item: MenuActionMoreOption | MoreSubActions) {
    this.menuActionStore.updateMoreOptions(item);
  }
}
