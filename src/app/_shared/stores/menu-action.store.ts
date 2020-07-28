import { Component, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { action, observable } from 'mobx-angular';
import { FormGroupActionModel, MenuActionMoreOption, MoreSubActions, MenuActionCheck } from 'study-core-ngx';

@Injectable()
export class MenuActionStore {

  // !!! Subjects
  private updateBehavior = new BehaviorSubject(null);
  private filterFormBehavior;
  private menuMoreOptionBehavior = new BehaviorSubject(null);
  private menuSubActionBehavior = new BehaviorSubject(null);
  private openedSubActionBehavior = new BehaviorSubject(null);

  // !!! Observables
  @observable public onUpdate = this.updateBehavior;
  @observable onOpenedSubAction = this.openedSubActionBehavior; // observable - mostra subActions no aside por cima do menu top

  // !!! public variables
  component: Component | any;
  menuMoreOptionList: Array<MenuActionMoreOption>;
  subActionList: Array<MoreSubActions>;

  // update
  private update(value) {
    this.updateBehavior.next(value);
  }

  // filter set
  @action setFilter(comp: Component | any): Observable<any> {
    this.component = comp;
    this.update(comp);
    this.filterFormBehavior = new BehaviorSubject(null); // zerar toda vez ao chamar essa funcao
    return this.filterFormBehavior.asObservable();
  }

  // filter update
  @action updateFilterFormValues(formGroupActionModel: FormGroupActionModel) {
    this.filterFormBehavior.next(formGroupActionModel);
  }

  // menuMoreOptions set
  @action setMoreOptions(...itemMenu: Array<MenuActionMoreOption>): Observable<any> {
    this.menuMoreOptionList = itemMenu;
    this.update(true);
    this.menuMoreOptionBehavior = new BehaviorSubject(null); // zerar toda vez ao chamar essa funcao
    return this.menuMoreOptionBehavior.asObservable();
  }

  // menuMoreOptions update
  @action updateMoreOptions(item: MenuActionMoreOption | MoreSubActions | MenuActionCheck) {
    this.menuMoreOptionBehavior.next(item);
  }

  // MoreSubActions set
  @action setSubActions(...item: Array<MoreSubActions>): Observable<any> {
    this.subActionList = item;
    this.update(true);
    this.menuSubActionBehavior = new BehaviorSubject(null); // zerar toda vez ao chamar essa funcao
    return this.menuSubActionBehavior.asObservable();
  }

  // MoreSubActions update
  @action updateSubActions(item: MoreSubActions) {
    this.menuSubActionBehavior.next(item);
  }

  /**
   * * Mostra subActions (aside por cima do menu principal com ações de acordo com os valores do subAction)
   * @param state (true = aberto | false = fechado)
   */
  @action showSubAction(state: boolean): void {
    this.openedSubActionBehavior.next(state);
  }

  // clear
  @action clear(): void {
    this.component = null;
    this.menuMoreOptionList = null;
    this.menuMoreOptionBehavior.next(false);
  }

}
