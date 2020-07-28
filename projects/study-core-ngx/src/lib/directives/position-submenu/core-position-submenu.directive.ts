import { AfterContentChecked, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';


@Directive({
  selector: '[corePositionSubmenu]'
})
export class CorePositionSubmenuDirective implements OnInit, AfterContentChecked {

  private marginLeft = '0px';
  private marginTop = '0px';

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private mediaObserver: MediaObserver,
  ) {
  }

  ngOnInit(): void {
    // pega altura e largura do elemento principal -> <a class="submenu--mat-list-item" mat-list-item ...

  }

  ngAfterContentChecked(): void {

    if ( !this.mediaObserver.isActive('sm') && !this.mediaObserver.isActive('xs')) {
      this.marginLeft = `${ this.elRef.nativeElement.clientWidth}px`;
      this.marginTop = `-${ this.elRef.nativeElement.clientHeight}px`;


      // se lasChild não é um element com *ngIf false ( tipo #comment )
      const el = new ElementRef(this.elRef.nativeElement.lastChild);
      if (el.nativeElement.nodeName !== '#comment') {
        this.renderer.setStyle(el.nativeElement, 'margin-left', this.marginLeft);
        this.renderer.setStyle(el.nativeElement, 'margin-top', this.marginTop);

        // submenu é travado no bottom da página quando ele está escondendo a baixo da tela ( pode acontecer em sub-menus maiores )
        if (el.nativeElement.offsetHeight + el.nativeElement.scrollHeight > window.innerHeight) {
          this.renderer.setStyle(el.nativeElement, 'bottom', '0px');
        } else {
          this.renderer.removeStyle(el.nativeElement, 'bottom');
        }
        // submenu ganha tamanho total e sendo scroll quando o seu tamanho é superior ao tamanho da tela
        if (el.nativeElement.scrollHeight > window.innerHeight) {
          // this.renderer.setStyle(el.nativeElement, 'overflow-y', 'auto');
          this.renderer.setStyle(el.nativeElement, 'height', '100%');
        } else {
          this.renderer.removeStyle(el.nativeElement, 'height');
        }
      }
    }
  }
}

