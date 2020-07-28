import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Renderer2, SimpleChanges
} from '@angular/core';

/**
 *  Muda a posição top do elemento de acordo com o nome do segundo passado por parametro
 */
@Directive({
  selector: '[coreAutoHeight]'
})
export class CoreAutoHeightDirective implements OnInit, AfterViewChecked {

  @Input('coreAutoHeight') moreHeight: string | Number;
  private nativeElementList: Array<Element> = new Array<Element>(); // elementos já contabilizados
  isGoMore: Boolean = true;
  isEventClick: Boolean = false;

  /**
   * tags com class que não serão considerados
   */
  whiteListClass = ['mat-fab'];

  constructor(public elRef: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
    // this.nativeElementList.push(this.elRef.nativeElement.parentNode);
    setTimeout(() => {
      // this.getHeight(this.elRef);
      this.calcHeight();
      this.isEventClick = true;
    }, 100);
  }

  ngAfterViewChecked(): void {
    console.log('check');
  }


  getStyle(oElm, strCssRule) {
    let strValue = '';
    if (document.defaultView && document.defaultView.getComputedStyle) {
      strValue = document.defaultView.getComputedStyle(oElm, '').getPropertyValue(strCssRule);
    } else if (oElm.currentStyle) {
      strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
        return p1.toUpperCase();
      });
      strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
  }

  getPaddingAndMarginTopBottom(el: Element) {
    let count = 0;
    count += parseInt(this.getStyle(el, 'padding-top'), 10);
    count += parseInt(this.getStyle(el, 'padding-bottom'), 10);
    count += parseInt(this.getStyle(el, 'margin-top'), 10);
    count += parseInt(this.getStyle(el, 'margin-bottom'), 10);

    return count;
  }


  private getHeight(thisRef: ElementRef, totalHeight: number = 0, heightToRemove: number = 0) {
    // se elemento parent tem altura menor que a tela do dispositivo
    // if (thisRef.nativeElement.parentNode && thisRef.nativeElement.parentNode.clientHeight < window.innerHeight) {
    if (thisRef.nativeElement.parentNode && this.isGoMore) {
      this.nativeElementList.push(thisRef.nativeElement);

      const elParent: Element = thisRef.nativeElement.parentNode;

      if (elParent && elParent.parentNode && elParent.parentNode.childNodes.length) {
        Array.prototype.forEach.call(thisRef.nativeElement.parentNode.children, (el: Element) => {

          // se a tag com class não consta na whitelist
          if (!this.whiteListClass.filter(item => el.classList.contains(item)).length) {

            if (el.tagName === 'ROUTER-OUTLET') {
              this.isGoMore = false;
            }

            // se nao contém um elemento já contabilizado
            if (!this.nativeElementList.filter((item: Element) => item === el).length) {
              const elR = (new ElementRef(el));
              if (thisRef.nativeElement.parentNode.clientHeight < window.innerHeight) {
                totalHeight += elR.nativeElement.clientHeight;
              }
              totalHeight += this.getPaddingAndMarginTopBottom(el);
            }
          }

        });
      }

      this.getHeight(new ElementRef(elParent), totalHeight, heightToRemove);
    } else {
      // if (thisRef.nativeElement.parentNode && thisRef.nativeElement.parentNode.clientHeight <= window.innerHeight) {
      //   const elParent: Element = thisRef.nativeElement.parentNode;
      //   if (elParent && elParent.parentNode && elParent.parentNode.childNodes.length) {
      //     Array.prototype.forEach.call(thisRef.nativeElement.parentNode.children, (el: Element) => {
      //         totalHeight += this.getPaddingAndMarginTopBottom(el);
      //     });
      //   }
      // }

      // console.log('document.getElementsByClassName(\'mat-toolbar\'): ', document.getElementsByClassName('mat-toolbar'));


      let more = 0;

      if (typeof this.moreHeight === 'string') {
      } else {
        const matTtoolbarRef = new ElementRef(document.getElementsByClassName('mat-toolbar').item(0));

        // console.log('matTtoolbarRef: ', matTtoolbarRef);
        // console.log('matTtoolbarRef.nativeElement.clientHeight: ', matTtoolbarRef.nativeElement.clientHeight);
        if (matTtoolbarRef && matTtoolbarRef.nativeElement) {
          totalHeight += matTtoolbarRef.nativeElement.clientHeight;
        }

        more = this.moreHeight ? Number(this.moreHeight) : 0;
      }


      const calc = `calc(100vh - ${ totalHeight - heightToRemove + more }px)`;
      console.log('autoHeigth', calc);

      this.renderer.setStyle(this.elRef.nativeElement, 'height', calc);
    }
  }

  calcHeight(totalHeight: number = 0, heightToRemove: number = 0) {
    // se smartphone, paginação pega quase toda a tela e o scroll vai totalmente para baixo
    // if (window.innerWidth <= 991) {
    //   const newHeight = (window.innerHeight - 40);
    //   this.renderer.setStyle(this.elRef.nativeElement, 'max-height', newHeight + 'px');
    //
    //   const closestElRefScrollPC = new ElementRef(this.elRef.nativeElement.closest('.col-list-options'));
    //   const closestElRefScrollSmartPhone = new ElementRef(this.elRef.nativeElement.closest('.page'));
    //
    //   setTimeout(() => {
    //     closestElRefScrollPC.nativeElement.scrollTo(0, window.innerHeight + newHeight);
    //     closestElRefScrollSmartPhone.nativeElement.scrollTo(0, window.innerHeight + newHeight);
    //   }, 500);
    // } else {
    this.getHeight(this.elRef, totalHeight, heightToRemove);
    // }
  }

  // @HostListener('document:click', ['$event'])
  // onMouseUp(event: MouseEvent) {
  //   event.stopPropagation();    // not working as I expected.
  //   event.preventDefault();     // not working as I expected.
  //
  //   // se não é smartphone
  //   if (window.innerWidth > 991) {
  //
  //     if (this.isEventClick) {
  //       this.isEventClick = false;
  //       this.isGoMore = true;
  //       this.nativeElementList = new Array<Element>();
  //
  //       setTimeout(() => {
  //         this.calcHeight(0, 0);
  //         this.isEventClick = true;
  //       }, 500);
  //     }
  //   }
  // }

}

