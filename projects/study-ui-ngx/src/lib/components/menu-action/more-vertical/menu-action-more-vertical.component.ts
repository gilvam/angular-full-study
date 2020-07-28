import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogActionComponent } from '../../dialog/action/dialog-action.component';
import { DialogActionSimpleComponent } from '../../dialog/action-simple/dialog-action-simple.component';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MenuActionMoreOption, MoreSubActions, MenuActionCheck, ActionInListEnum } from 'study-core-ngx';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'ui-menu-action-more-vertical',
  templateUrl: './menu-action-more-vertical.component.html',
  styleUrls: ['./menu-action-more-vertical.component.scss'],
  encapsulation: ViewEncapsulation.None, // adiciona css nos components filhos
})
export class MenuActionMoreVerticalComponent implements OnChanges {

  @Input() menuMoreOptions: Array<MenuActionMoreOption>;
  @Output() changeMatMenuClick: EventEmitter<MenuActionMoreOption> = new EventEmitter<MenuActionMoreOption>();
  @Output() changeDialogActionCheck: EventEmitter<MenuActionCheck> = new EventEmitter<MenuActionCheck>();
  @Output() changeDialogActionClosed: EventEmitter<any> = new EventEmitter<any>();

  @Input() subActions: Array<MoreSubActions>; // usado para modal ser chamda separadamente e mostrar alguns botões de ação
  @Input() showDialog: boolean; // mostrar ou esconder o dialog com os botões subActions

  dialogRef: MatDialogRef<any, any>;

  constructor(private matDialog: MatDialog, private overlay: Overlay) {
  }

  private openAside(subActions: Array<MoreSubActions>, item?: MenuActionMoreOption, isSimpleAside?: boolean) {
    // se não existe MenuActionMoreOption, cria um (apenas para usar o modal quando não é necessário o icone de + opções)
    item = item ? item : new MenuActionMoreOption(ActionInListEnum.MULTIPLE_ACTION, null, null, subActions);
    this.changeMatMenuClick.emit(item);

    setTimeout(() => {
      this.dialogRef = this.matDialog.open(isSimpleAside ? DialogActionSimpleComponent : DialogActionComponent, {
        hasBackdrop: false,
        panelClass: 'pane-action-header',
        backdropClass: 'haha-backdrop',
        scrollStrategy: this.overlay.scrollStrategies.noop(), // não trava o scroll da página
        data: { subActions: subActions }
      });

      // se check marcado
      this.dialogRef.componentInstance.changeCheck.subscribe((maCheck: MenuActionCheck) => {
        this.changeDialogActionCheck.emit(maCheck);
      });

      // se modal fechado
      this.dialogRef.afterClosed().subscribe(result => {
        this.changeDialogActionClosed.emit(result);
      });

    }, 0);
  }

  clickAction(subActions: Array<MoreSubActions>, item?: MenuActionMoreOption) {
    this.openAside(subActions, item);
  }

  clickActionSimple(subActions: Array<MoreSubActions>, item?: MenuActionMoreOption) {
    this.openAside(subActions, item, true);
  }

  cleanAction() {
    if (this.menuMoreOptions && this.menuMoreOptions.length) {
      // realizar uma cópia da variável sem modificar a original - COPY
      const itemCopy = JSON.parse(JSON.stringify(this.menuMoreOptions[0]));
      // limpa todos os valores dentro do objeto deixando apenas as keys
      Object.keys(itemCopy).forEach(key => {
        itemCopy[key] = null;
      });

      this.changeMatMenuClick.emit(itemCopy);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    /**
     * mostra o aside com subActions quando o showDialog for true
     */
    if (changes.showDialog && this.subActions && this.subActions.length) {
      if (this.showDialog === true) {
        this.clickActionSimple(this.subActions);
        console.log('simple ACTION: ');
      } else {
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      }
    }

  }

}

