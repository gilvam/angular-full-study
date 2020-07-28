import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 *  Checa o tamanho do elemento e deixa com o tamanho height até o final da janela
 *  ideal para ser usando em elementos com scroll
 */
@Directive({
  selector: '[corePositionByElement]'
})
export class CorePositionByElementDirective implements OnInit {

  @Input('corePositionByElement') byElement: string;

  constructor(public elRef: ElementRef, public renderer: Renderer2) {
    console.log('[ corePositionByElement ]');
  }

  ngOnInit() {
    const elParent: Element = this.elRef.nativeElement.parentNode;

    console.log('corePositionByElement', elParent);


    if (elParent && elParent.parentNode && elParent.parentNode.childNodes.length) {
      Array.prototype.forEach.call(this.elRef.nativeElement.parentNode.children, (el: Element) => {

        // se nao contém um elemento já contabilizado
        if (this.elRef.nativeElement !== el) {
          const elR = new ElementRef(el);
          const domRect = elR.nativeElement.getBoundingClientRect();
          const newTop = domRect.height + domRect.top;

          // setTimeout(() => {
            console.log('this.elRef.nativeElement: ', this.elRef.nativeElement);
            this.renderer.setStyle(this.elRef.nativeElement, 'top', newTop + 'px');
          // }, 1000);
        }
      });
    }
  }
}

