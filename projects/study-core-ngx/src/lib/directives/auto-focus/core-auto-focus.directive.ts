import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

/**
 *  seta autofocus em uma input
 */
@Directive({
  selector: '[coreAutoFocus]'
})
export class CoreAutoFocusDirective implements OnChanges {

  @Input('coreAutoFocus') auto: Array<boolean>;
  isSearch: boolean;
  isSearchAdvanced: boolean;

  constructor(public elRef: ElementRef, public renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isSearch = this.auto && this.auto.length ? this.auto[0] : null;
    this.isSearchAdvanced = this.auto && this.auto.length === 2 ? this.auto[1] : null;

    setTimeout(() => {
      // se foi ativado a busca e não é uma busca avançada
      if (this.isSearch && !this.isSearchAdvanced) {
        const htmlElement: HTMLElement = this.getHtmlElement();
        if (htmlElement) {
          htmlElement.focus();
        }
      }
    });
  }

  private getHtmlElement(): HTMLElement {
    const selectors = ['input', 'select', 'textarea'];
    let htmlElement: HTMLElement;

    selectors.map((selector) => {
      // se a diretiva foi usada diretamente em uma tag input e similares
      if (this.elRef.nativeElement.tagName === selector.toUpperCase()) {
        htmlElement = this.elRef.nativeElement;
      }
      // se a diretiva foi usada em uma tag superior ao tipo input e similares
      else {
        const el = this.elRef.nativeElement.querySelector(selector);
        if (el) {
          htmlElement = el;
        }
      }

    });
    return htmlElement;
  }

}

