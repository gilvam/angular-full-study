import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SidenavEndStore } from '../../stores/sidenav-end.store';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-sidenav-end',
  templateUrl: './sidenav-end.component.html',
  styleUrls: ['./sidenav-end.component.scss']
})
export class SidenavEndComponent implements AfterViewInit, OnDestroy {

  @ViewChild('template', { read: ViewContainerRef, static: false }) template;
  @Input() matSidenav;
  private componentRef: ComponentRef<any>;
  private routerSubscription;

  constructor(
    public sidenavEndStore: SidenavEndStore,
    private resolver: ComponentFactoryResolver,
    private router: Router,
  ) {
    /**
     * ao trocar de rota, limpa todos os dados referentes ao sidenavStart
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
    this.sidenavEndStore.onUpdate.subscribe(() => {
      if (this.sidenavEndStore && this.sidenavEndStore.component) {
        this.createComponent(this.sidenavEndStore.component, this.template);
      }
    });

    this.sidenavEndStore.onOpened.subscribe((opened: boolean) => {
      if (this.matSidenav) {
        if (opened) {
          this.matSidenav.open();
        } else {
          this.matSidenav.close();
        }
      }
    });
  }

  ngOnDestroy() {
    this.removeComponent();
  }

  /**
   * cria component no na referencia @ViewChild('filter')
   * @param component
   * @param viewChild
   */
  createComponent(component, viewChild?: ViewContainerRef) {
    if (viewChild) {
      viewChild.clear();
    }
    let factory: ComponentFactory<any>;
    factory = this.resolver.resolveComponentFactory(component);

    this.componentRef = viewChild.createComponent(factory);
  }


  /**
   * remove o component criado anteriormente
   */
  removeComponent() {
    if (this.template) {
      this.template.clear();
    }
    if (this.sidenavEndStore) {
      this.sidenavEndStore.clear();
    }

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
