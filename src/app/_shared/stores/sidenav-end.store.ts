import { Component, Injectable } from '@angular/core';
import { action, observable } from 'mobx-angular';
import { BehaviorSubject } from 'rxjs';
import { MenuActionStore } from './menu-action.store';

@Injectable()
export class SidenavEndStore {

  constructor(private menuActionStore: MenuActionStore) {
  }

  // !!! Subjects
  private onChangesBehavior = new BehaviorSubject(null);
  private openedBehavior = new BehaviorSubject(null);

  // !!! Observables
  @observable onUpdate = this.onChangesBehavior; // observable - se aside foi atualizado
  @observable onOpened = this.openedBehavior;   // observable - se aside está aberto ou fechado
  @observable component: Component | any;

  /**
   * * Mostra a sidenav direta.
   * @param state (true = aberto || false = fechado)
   */
  @action show(state: boolean): void {
    this.openedBehavior.next(state);
    // this.menuActionStore.showSubAction(state);
  }

  /**
   * * Atualiza o conteúdo da sidenav.
   * @param value
   */
  @action update(value: Component | any): void {
    this.onChangesBehavior.next(value);
  }

  /**
   * * Define qual componente aparecerá na sidenav direita.
   * @param comp (Classe do componente a ser carregado).
   */
  @action set(comp: Component | any): void {
    this.component = comp;
    this.update(comp);
  }

  /**
   * * Limpa todas as variáveis.
   */
  @action clear(): void {
    this.component = null;
    this.onChangesBehavior.next(null);
    this.openedBehavior.next(false);
    // this.menuActionStore.showSubAction(false);
  }

}
