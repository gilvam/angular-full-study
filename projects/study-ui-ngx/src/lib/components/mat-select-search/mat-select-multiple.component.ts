import {
  AfterContentInit,
  Component,
  ContentChild,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MatCheckbox, MatFormFieldControl } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { CoreUtil } from 'study-core-ngx';


@Component({
  selector: 'ui-mat-select-multiple',
  templateUrl: './mat-select-multiple.component.html',
  styleUrls: ['./mat-select-multiple.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: ControlContainer, useExisting: FormGroupDirective }, // necessário para ter acesso ao FormGroup usando junto ao @ContentChild
    { provide: MatFormFieldControl, useExisting: forwardRef(() => MatSelectMultipleComponent) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatSelectMultipleComponent), multi: true }
  ]
})
export class MatSelectMultipleComponent implements ControlValueAccessor, OnChanges, AfterContentInit, OnDestroy {

  @ContentChild(ControlContainer, {static: true}) controlContainer;                 // Referência ao ControlContainer
  @ContentChild(FormControlName, {static: true}) formControlName: FormControlName;  // Referência ao FormControlName

  @Input() items: any;          // lista de objetos | lista de string
  @Input() itemName: string;    // se items é uma lista de objetos, esse é o valor padrão para visualizado no select
  @Input() placeholder: string; // nome placeholder
  @Input() multiple: boolean;   // ativar a seleção multipla
  @Input() returnKey: string;   // key usada para retorno de uma lista de objetos

  private _onDestroy = new Subject<void>();         // emit quando o component é destruído.
  itemFilterCtrl: FormControl = new FormControl();  // control para o ui-search
  filteredItems: ReplaySubject<any[]> = new ReplaySubject<any[]>(1); // itens listados com ou sem filtro

  constructor(
    @Optional() public formGroupName: FormGroupName, // closest parent ( caso a input estaja dentro de um formGroup )
  ) {
  }

  ngAfterContentInit(): void {
    if (this.multiple) {
      this.formControlName.control.setValue([]);
    }
  }

  // inicia se as informações demoraram a chegar (REST)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && changes.items.currentValue) {
      this.init();
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private init() {
    if (this.items) {
      this.setInitialValue();
      // forçar o uso correto do mat-select-multiple
      if (this.items) {
        if (typeof this.items[0] === 'object') {
          if (!this.itemName) {
            console.error('ERRO: ', `é necessário adicionar qualquer nome/key no 'itemName' referente ao 'items'
            EX: <ui-mat-select-multiple [items]="items" [itemName]="'name'" ...`);
          } else if (!this.items[0][this.itemName]) {
            console.error('ERRO: ', `'items' não contém uma key com o nome '${ this.itemName }'`);
          }
        } else if (typeof this.items[0] === 'string') {
          if (this.itemName) {
            console.error('ERRO: ', `'items' é do tipo Array<string | number>. remova 'itemName' do select '${ this.placeholder }'`);
          }
          if (this.returnKey) {
            console.error('ERRO: ', `'items' é do tipo Array<string | number>. remova 'returnKey' do select '${ this.placeholder }'`);
          }
        }
      }

      // inicia o pesquisa
      this.filteredItems.next(this.items.slice());

      this.itemFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe((i) => {
          this.filterItem();
        });
    }
  }

  private filterItem() {
    if (!this.items) {
      return;
    }
    let search = this.itemFilterCtrl.value; // get the search keyword
    if (!search) {
      this.filteredItems.next(this.items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredItems.next( // filter the items
      this.items.filter(item => {
        if (typeof item === 'string') {
          return item.toLowerCase().indexOf(search) > -1;
        }
        return item[this.itemName].toLowerCase().indexOf(search) > -1;
      })
    );
  }

  /**
   * Sets the initial value after the filteredItems are loaded initially
   */
  private setInitialValue() {
    if (this.formControlName.name) {

      // if valor de retorno para edição do form é um array e a primeira posição do array contém keys
      if (
        this.formControlName.control.value instanceof Array
        && typeof this.formControlName.control.value[0]
        !== 'string' && Object.keys(this.formControlName.control.value[0]).length
      ) {
        const itemCtrlInitial = new Array<any>();
        this.formControlName.control.value.map(val => {
          this.items.map(item => {
            if (CoreUtil.isEquals(val, item)) {
              itemCtrlInitial.push(item);
            }
          });
        });
        this.formControlName.control.setValue(itemCtrlInitial);
      }
      // if valor de retorno para edição do form é um array e provavel array de strings/number com ids
      else if (this.formControlName.control.value instanceof Array) {
        const itemCtrlInitial = new Array<any>();
        this.formControlName.control.value.map(val => {
          this.items.map(item => {
            if (this.returnKey && item[this.returnKey] === val) {
              itemCtrlInitial.push(item);
            } else if (item.id === val) {
              itemCtrlInitial.push(item);
            }

          });
        });
        this.formControlName.control.setValue(itemCtrlInitial);
      }
      // não é array
      else {
        this.formControlName.control.setValue(this.formControlName.control.value);
      }
    }
  }

  setItem(item) {
    if (this.returnKey && this.items && this.items.length) {
      // console.log('if 01', 'key: ', this.returnKey, ' | item: ', item);
      return item[this.returnKey];
    }
    // retorno sem controle de key
    return item;
  }

  // marca ou desmarca todos
  selectOrUnselectAll(isChecked: boolean) {
    this.formControlName.control.setValue([]);
    if (isChecked) { // se chechecd, marca todos
      this.formControlName.control.setValue(
        this.items.map(item => this.setItem(item))
      );
    }
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }
}
