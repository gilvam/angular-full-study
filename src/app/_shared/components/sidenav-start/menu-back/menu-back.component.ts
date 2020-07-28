import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { SidenavStartStore } from 'src/app/_shared/stores/sidenav-start.store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Location } from '@angular/common';
import { MatListItem, MatNavList } from '@angular/material';

@Component({
  selector: 'app-menu-back',
  templateUrl: './menu-back.component.html',
})
export class MenuBackComponent implements AfterViewInit, OnDestroy {

  @ViewChild('sidenavStart', { read: ViewContainerRef, static: false }) sidenavStart;

  private componentRef: ComponentRef<any>;
  private routerSubscription: any;

  constructor(
    public sidenavStartStore: SidenavStartStore,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private permissionsService: NgxPermissionsService,
    private location: Location,
  ) {

    /**
     * ao trocar de rota, limpa todos os dados referentes ao sidenavStartStore
     */
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.removeComponent();
      }
    });
  }

  ngAfterViewInit(): void {
    /**
     * Cria o novo component se exitir depois de excluir um compoment anterior
     */
    this.sidenavStartStore.onUpdate.subscribe(() => {
      if (this.sidenavStartStore) {
        if (this.sidenavStartStore.component) {
          this.createComponent(this.sidenavStartStore.component, this.sidenavStart);
        }
      }
    });
  }

  ngOnDestroy() {
    this.removeComponent();
  }

  /**
   * cria component no na referencia @ViewChild('sidenavStart')
   * @param component
   * @param viewChild
   */
  createComponent(component, viewChild: ViewContainerRef) {
    if (viewChild) {
      viewChild.clear();
      let factory: ComponentFactory<any>;
      factory = this.resolver.resolveComponentFactory(component);
      console.log('viewChild: ', viewChild);
      this.componentRef = viewChild.createComponent(factory);
    }
  }


  /**
   * remove o component criado anteriormente
   */
  removeComponent() {
    if (this.sidenavStart) {
      this.sidenavStart.clear();
    }
    if (this.sidenavStartStore) {
      this.sidenavStartStore.clear();
    }

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  showMenu(matListItem: MatListItem) {
    matListItem['opened'] = !matListItem['opened'];
  }
}
