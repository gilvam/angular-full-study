import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy, OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SidenavStartStore } from '../../stores/sidenav-start.store';
import { MenuBackComponent } from './menu-back/menu-back.component';
import { MenuCheckoutComponent } from './menu-checkout/menu-checkout.component';

const WHITE_LIST = {
  back: MenuBackComponent,
  main: MenuCheckoutComponent,
};

@Component({
  selector: 'app-sidenav-start',
  templateUrl: './sidenav-start.component.html',
  styleUrls: ['./sidenav-start.component.scss'],
})
export class SidenavStartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('template', { read: ViewContainerRef, static: false }) template;
  private componentRef: ComponentRef<any>;
  private routerSubscription;
  private componentOld: Component;
  private isNewComponent: boolean;

  constructor(
    public sidenavStartStore: SidenavStartStore,
    private resolver: ComponentFactoryResolver,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    /**
     * seta component default por rota
     */
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split('/')[1];
        // console.log('change', ' | url:', event.urlAfterRedirects, ' | url:', url, ' | whiteList:', WHITE_LIST[url] ? true : false);
        if (url && WHITE_LIST[url]) {
          this.createInit(WHITE_LIST[url]);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    /**
     * Cria o novo component se exitir depois de excluir um compoment anterior
     */
    this.sidenavStartStore.onUpdate.subscribe(() => {
      this.createInit(this.sidenavStartStore.component);
    });
  }

  ngOnDestroy() {
    this.removeComponent();
  }

  /**
   * início do processo de criação do component menu
   */
  createInit(component: Component) {
    if (!component) {
      this.removeComponent();
    } else if (
      (component instanceof Function) &&
      (
        !(this.componentOld instanceof Function) ||
        (this.componentOld instanceof Function) && component['name'] !== this.componentOld['name']
      )
    ) {
      this.componentOld = component;
      this.createComponent(component, this.template);
      // component = null;
      this.isNewComponent = true;
    } else {
      this.isNewComponent = false;
    }
  }

  /**
   * cria component na referencia @ViewChild('filter') | nesse caso substitui o component setado por rota no construtor
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
    if (this.sidenavStartStore) {
      this.sidenavStartStore.clear();
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.componentOld = null;
  }

}
