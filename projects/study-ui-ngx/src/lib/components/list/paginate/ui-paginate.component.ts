import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MenuActionCheck, MenuActionMoreOption, PageModel, PaginateTypeListEnum } from 'study-core-ngx';
import { MatSelectionList } from '@angular/material';

@Component({
  selector: 'ui-paginate',
  templateUrl: './ui-paginate.component.html',
  styleUrls: ['./ui-paginate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UiPaginateComponent implements OnChanges, AfterViewInit {

  @ContentChild(MatSelectionList, {static: true}) matSelectionList: MatSelectionList; // Referência ao mat-selection-list

  @ViewChildren('content') content: QueryList<any>;

  @Output() changeScroll = new EventEmitter<any>();
  @Output() changeSelectedList = new EventEmitter<any>();

  @Input() page: PageModel<any>;
  @Input() paginationDescription: string;
  @Input() typeList: PaginateTypeListEnum | 'table' | 'default' | 'card';
  @Input() emptyMsgTitle: string;
  @Input() emptyMsgDescription: string;
  @Input() menuActionCheck: MenuActionCheck | MenuActionMoreOption;

  headerList = new Array<any>();
  uiListStyle = {};

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('menuActionCheck: ', this.menuActionCheck);
    if (changes.menuActionCheck && changes.menuActionCheck.currentValue instanceof MenuActionMoreOption) {
      this.matSelectionList.deselectAll(); // limpa selects
    }
    // se check true ou false
    else if (changes.menuActionCheck && changes.menuActionCheck.currentValue instanceof MenuActionCheck) {
      // @ts-ignore
      if (this.menuActionCheck.isCheck === true) {
        this.matSelectionList.selectAll(); // marca todos selects
        // @ts-ignore
      } else if (this.menuActionCheck.isCheck === false) {
        this.matSelectionList.deselectAll(); // limpa selects
      }
    }
  }

  ngAfterViewInit(): void {

    /**
     * adicionar fxFlex da listagem nos títulos
     */
    if (this.typeList === 'table') {
      const onContent = this.content.changes.subscribe(content => {
        const uiList = content.first.nativeElement.querySelector('ui-list');
        const uiListCell: NodeList = uiList.querySelectorAll('ui-list-cell');
        const matListAction: NodeList = content.first.nativeElement.querySelector('.mat-list-action');
        const matListActionRef: ElementRef = new ElementRef(matListAction);
        this.uiListStyle = { 'paddingRight': `${ matListActionRef.nativeElement.clientWidth }px` };

        uiListCell.forEach((elTmp: Node, i) => {
          const el: ElementRef = new ElementRef(elTmp);
          const namedNode: NamedNodeMap = el.nativeElement.attributes;
          const desk = { text: '', flex: { default: '', xs: undefined, sm: undefined, md: undefined, lg: undefined, xl: undefined } };

          Object.keys(namedNode).forEach((name) => {
            // se contains 'fx-flex'
            if (namedNode[name].name.indexOf('fx-flex') >= 0) {
              const key = namedNode[name].name.replace('ng-reflect-fx-flex', '').replace('.', '');
              desk.flex[key ? key : 'default'] = namedNode[name].nodeValue;
            }
            if (namedNode[name].name.indexOf('ng-reflect-title') === 0) {
              desk.text = namedNode[name].nodeValue;
            }
          });

          // caso algum item do fxFlex não tenha valor, pega o valor defaul fxFlex
          desk.flex.xl = desk.flex.xl ? desk.flex.xl : desk.flex.default; // xl (min-width: 1920px) and (max-width: 5000px)
          desk.flex.lg = desk.flex.lg ? desk.flex.lg : desk.flex.default; // lg (min-width: 1280px) and (max-width: 1919px)
          desk.flex.md = desk.flex.md ? desk.flex.md : desk.flex.default; // md (min-width: 960px) and (max-width: 1279px)
          desk.flex.sm = desk.flex.sm ? desk.flex.sm : desk.flex.default; // sm (min-width: 600px) and (max-width: 959px)
          desk.flex.xs = desk.flex.xs ? desk.flex.xs : desk.flex.default; // xs (min-width: 0px) and (max-width: 599px)

          this.headerList.push(desk);
        });

        onContent.unsubscribe();
      });
    }

    this.matSelectionList.registerOnChange(item => {
      if (this.menuActionCheck) {
        this.changeSelectedList.emit(item); // selects marcados
      }
    });
  }

  /**
   * Envia para o componente pai quando a paginação chega ao final e o component pai carrega mais dados
   */
  public scrolledActivate() {
    this.changeScroll.emit();
  }

  instanceofMenuActionCheck(): boolean {
    return (this.menuActionCheck instanceof MenuActionCheck || this.menuActionCheck instanceof MenuActionMoreOption);
  }
}
