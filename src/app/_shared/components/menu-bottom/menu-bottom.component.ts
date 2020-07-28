import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { MenuBottomStore } from '../../stores/menu-bottom.store';
import { BottomNavModel } from '../../models/bottom-nav.model';
import { CheckoutStepsEnum } from '../../enums/checkout-steps.enum';
import { NavigationStart, Router } from '@angular/router';
import { CoreUtil } from 'study-core-ngx';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.scss']
})
export class MenuBottomComponent implements OnInit {

  protected bottomNavModel: BottomNavModel;
  protected disabled = false;
  private routerSubscription;
  private routerOutletContainerRef: ElementRef;

  constructor(
    private mediaObserver: MediaObserver,
    public renderer: Renderer2,
    public menuBottomStore: MenuBottomStore,
    private router: Router,
  ) {
    /**
     * ao trocar de rota, limpa todos os dados referentes ao sidenavStart
     */
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.menuBottomStore.clearData();

        if (this.routerOutletContainerRef) {
          this.renderer.removeStyle(this.routerOutletContainerRef.nativeElement, 'max-height');
        }
        // this.routerOutletContainerRef = null;
      }
    });
  }

  ngOnInit() {
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      changes.map(change => {
        if (change.mqAlias.length === 2) {
          if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
            this.setHeigthInContainer();
          } else {
            this.setHeigthInContainer();
          }
        }
      });
    });

    this.menuBottomStore.bottomNav
      .subscribe(model => {
        this.bottomNavModel = model;

        if (this.bottomNavModel.currentStep === CheckoutStepsEnum.DebitList) {
          this.handleDebitListButton();
        }

        this.setHeigthInContainer();
      });
  }

  private setHeigthInContainer() {
    setTimeout(() => {
      if (this.menuBottomStore.isHtmlVisible) {
        let height: number;
        height = window.innerHeight; // altura total da tela

        // menu superior
        const menuTopRef = new ElementRef(document.getElementsByTagName('mat-sidenav-content').item(0));
        height -= menuTopRef.nativeElement.firstElementChild.clientHeight; // altura total do menu superior

        // container com o height a ser modificado
        this.routerOutletContainerRef = new ElementRef(document.getElementById('router-outlet-container'));
        height -= CoreUtil.getPaddingAndMarginTopBottom(this.routerOutletContainerRef.nativeElement); // padding e margin do container

        // menu bottom
        const menuBottomRef = new ElementRef(document.getElementsByTagName('app-menu-bottom').item(0));
        height -= menuBottomRef.nativeElement.lastElementChild.clientHeight;

        this.renderer.setStyle(this.routerOutletContainerRef.nativeElement, 'max-height', `${ height }px`);
      }
      // }
    }, 0);
  }

  goToNextCheckoutStep() {
    this.menuBottomStore.goToStep(this.bottomNavModel.currentStep + 1);
  }

  goToPreviousCheckoutStep() {
    this.menuBottomStore.goToStep(this.bottomNavModel.currentStep - 1);
  }

  private handleDebitListButton() {
    this.disabled = true;

    this.menuBottomStore.debitListStepCompleted
      .subscribe(completed => {
        this.disabled = !completed;
      });
  }

  /**
   * altera tamanho do container toda vez que a janela mudar de tamanho
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setHeigthInContainer();
  }
}
