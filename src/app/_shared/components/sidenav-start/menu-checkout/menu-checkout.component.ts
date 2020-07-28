import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { SidenavStartStore } from 'src/app/_shared/stores/sidenav-start.store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Location } from '@angular/common';
import { BaseComponent } from '../../../../_shared/base.component';

@Component({
  selector: 'app-menu-checkout',
  templateUrl: './menu-checkout.component.html',
  styleUrls: ['./menu-checkout.component.scss'],

})
export class MenuCheckoutComponent extends BaseComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('sidenavStart', { read: ViewContainerRef, static: false }) sidenavStart;

  private componentRef: ComponentRef<any>;
  private routerSubscription: any;

  covenantsItemList = [
    { name: 'con 001', idCustom: 'A', id: 1 },
    { name: 'con 002', idCustom: 'B', id: 2 },
    { name: 'con 003', idCustom: 'C', id: 3 },
    { name: 'con 004', idCustom: 'D', id: 4 },
  ];

  statesItemList = [
    { name: 'Todos', id: 1 },
    { name: 'A', id: 2 },
    { name: 'B', id: 3 },
  ];

  constructor(
    public sidenavStartStore: SidenavStartStore,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private permissionsService: NgxPermissionsService,
    private location: Location,
  ) {
    super();
    /**
     * ao trocar de rota, limpa todos os dados referentes ao sidenavStartStore
     */
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.removeComponent();
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    // this.formGroup.get('states').setValue(1);
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      field1: [''],
      field2: [''],
      covenants: [''],
      states: [this.statesItemList[0].id],
    }, { updateOn: 'blur' }); // atualiza os campos com validaçoes quando o seu valor sofre alteração e passa para o próximo
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
}
