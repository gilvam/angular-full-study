import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchComponent), multi: true }],
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

  @ViewChild('searchSelectInput', { read: ElementRef, static: true }) searchSelectInput: ElementRef;
  @ViewChild('searchSelectInput', { static: true }) searchInput: ElementRef;

  @Input() placeholderLabel = 'Pesquisar'; // label default a ser exibida
  @Input() noEntriesFoundLabel = 'Nenhuma opção encontrada'; // label a ser exibido quando nenhuma entrada for encontrada

  private _value: string;
  private previousSelectedValues: any[];        // Previously selected values when using <mat-select [multiple]="true">
  private overlayClassSet = false;              // Whether the backdrop class has been set
  private change = new EventEmitter<string>();  // Event that emits when the current value changes
  private _onDestroy = new Subject<void>();     // Subject that emits when the component has been destroyed.
  _options: QueryList<MatOption>;               // Reference to the MatSelect options

  onChange: Function = (_: any) => {};
  onTouched: Function = (_: any) => {};

  constructor(
    @Inject(MatSelect) public matSelect: MatSelect,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    // set custom panel class
    const panelClass = 'mat-select-search-panel';
    if (this.matSelect.panelClass) {
      if (Array.isArray(this.matSelect.panelClass)) {
        this.matSelect.panelClass.push(panelClass);
      } else if (typeof this.matSelect.panelClass === 'string') {
        this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
      } else if (typeof this.matSelect.panelClass === 'object') {
        this.matSelect.panelClass[panelClass] = true;
      }
    } else {
      this.matSelect.panelClass = panelClass;
    }

    // when the select dropdown panel is opened or closed
    this.matSelect.openedChange
      .pipe(takeUntil(this._onDestroy))
      .subscribe((opened) => {
        if (opened) {
          // focus the search field when opening
          this.focus();
        } else {
          // clear it when closing
          this.reset();
        }
      });

    // set the first item active after the options changed
    this.matSelect.openedChange
      .pipe(take(1))
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this._options = this.matSelect.options;
        this._options.changes
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            const keyManager = this.matSelect._keyManager;
            if (keyManager && this.matSelect.panelOpen) {
              // avoid "expression has been changed" error
              setTimeout(() => {
                keyManager.setFirstItemActive();
              });
            }
          });
      });

    // detect changes when the input changes
    this.change
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.changeDetectorRef.detectChanges();
      });

    this.initMultipleHandling();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    this.setOverlayClass();
  }

  // valor atual da pesqusa
  get value(): string {
    return this._value;
  }

  /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * -param {KeyboardEvent} event
   */
  _handleKeydown(event: KeyboardEvent) {
    if (event.key === ' ') {
      // do not propagate spaces to MatSelect, as this would select the currently active option
      event.stopPropagation();
    }
  }

  writeValue(value: string) {
    const valueChanged = value !== this._value;
    if (valueChanged) {
      this._value = value;
      this.change.emit(value);
    }
  }

  onInputChange(value) {
    const valueChanged = value !== this._value;
    if (valueChanged) {
      this._value = value;
      this.onChange(value);
      this.change.emit(value);
    }
  }

  onBlur(value: string) {
    this.writeValue(value);
    this.onTouched();
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  /**
   * Focuses the search input field
   */
  public focus() {
    if (!this.searchSelectInput) {
      return;
    }
    // save and restore scrollTop of panel, since it will be reset by focus()
    // note: this is hacky
    const panel = this.matSelect.panel.nativeElement;
    const scrollTop = panel.scrollTop;

    // focus
    this.searchSelectInput.nativeElement.focus();

    panel.scrollTop = scrollTop;
  }

  /**
   * Resets the current search value
   * -param {boolean} focus whether to focus after resetting
   */
  reset(focus?: boolean) {
    if (!this.searchSelectInput) {
      return;
    }
    this.searchSelectInput.nativeElement.value = '';
    this.onInputChange('');
    if (focus) {
      this.focus();
    }
  }

  /**
   * Sets the overlay class  to correct offsetY
   * so that the selected option is at the position of the select box when opening
   */
  private setOverlayClass() {
    if (this.overlayClassSet) {
      return;
    }
    const overlayClass = 'cdk-overlay-pane-select-search';

    this.matSelect.overlayDir.attach
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        // note: this is hacky, but currently there is no better way to do this
        this.searchSelectInput.nativeElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.classList.add(overlayClass);
      });

    this.overlayClassSet = true;
  }


  /**
   * Initializes handling <mat-select [multiple]="true">
   * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
   */
  private initMultipleHandling() {
    // armazena valores previamente selecionados e os restaura quando eles são desmarcados
    // porque a opção não está disponível enquanto estamos atualmente filtrando
    this.matSelect.valueChange
      .pipe(takeUntil(this._onDestroy))
      .subscribe((values) => {
        if (this.matSelect.multiple) {
          let restoreSelectedValues = false;
          if (this._value && this._value.length
            && this.previousSelectedValues && Array.isArray(this.previousSelectedValues)) {
            if (!values || !Array.isArray(values)) {
              values = [];
            }
            const optionValues = this.matSelect.options.map(option => option.value);
            this.previousSelectedValues.forEach(previousValue => {
              if (values.indexOf(previousValue) === -1 && optionValues.indexOf(previousValue) === -1) {
                // se um valor que foi selecionado antes estiver desmarcado e não for encontrado nas opções, ele foi desmarcado
                // devido à filtragem, então a restauramos
                values.push(previousValue);
                restoreSelectedValues = true;
              }
            });
          }

          if (restoreSelectedValues) {
            this.matSelect._onChange(values);
          }

          this.previousSelectedValues = values;
        }
      });
  }

}
