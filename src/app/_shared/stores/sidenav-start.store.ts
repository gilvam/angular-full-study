import { Component, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { action, observable } from 'mobx-angular';
import { FormGroup } from '@angular/forms';

@Injectable()
export class SidenavStartStore {

  // !!! Subjects
  private sidenavBehavior: any;
  private updateBehavior = new BehaviorSubject(null);
  private openedBehavior = new BehaviorSubject<boolean>(null);

  // !!! Observables
  @observable public onUpdate = this.updateBehavior;
  @observable onStatus = this.openedBehavior;

  // !!! public variables
  component: Component;

  /**
   * * Mostra a sidenav direta.
   * @param state (true = aberto || false = fechado)
   */
  @action show(state: boolean): void {
    this.openedBehavior.next(state);
  }

  // update
  private update(value: any) {
    this.updateBehavior.next(value);
  }

  // set
  @action set(comp: Component | any): Observable<any> {
    this.component = comp;
    this.update(comp);
    this.sidenavBehavior = new BehaviorSubject(null); // zerar toda vez ao chamar essa funcao
    return this.sidenavBehavior.asObservable();
  }
  // filter update
  @action updateSidenav(formGroup: FormGroup) {
    this.sidenavBehavior.next(formGroup);
  }

  // clear
  @action clear(): void {
    this.component = null;
  }

}
