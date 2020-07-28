import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { action, observable } from 'mobx-angular';
import { CheckoutStepsEnum } from '../enums/checkout-steps.enum';
import { BottomNavModel } from '../models/bottom-nav.model';

@Injectable()
export class MenuBottomStore {

  // !!! Subjects
  private readonly selectedDebitsSubject = new BehaviorSubject([]);
  private readonly bottomNavSubject = new BehaviorSubject<BottomNavModel>(new BottomNavModel());
  private readonly nextStepSubject = new BehaviorSubject<CheckoutStepsEnum>(null);
  private readonly debitListStepCompletedSubject = new BehaviorSubject(null);

  public isHtmlVisible: boolean;

  // !!! Observables
  @observable selectedDebits: Observable<Array<any>> = this.selectedDebitsSubject;
  @observable bottomNav: Observable<BottomNavModel> = this.bottomNavSubject;
  @observable nextStep: Observable<CheckoutStepsEnum> = this.nextStepSubject;
  @observable debitListStepCompleted: Observable<boolean> = this.debitListStepCompletedSubject;

  /**
   * * Cria a navegação inferior a partir de um BottomNavModel.
   * @param bottomNavModel
   */
  @action setBottomNav(bottomNavModel: BottomNavModel) {
    this.isHtmlVisible = true;
    this.bottomNavSubject.next(bottomNavModel);
  }

  /**
   * * Vai para um passo do checkout.
   * @param targetStep
   */
  @action goToStep(targetStep: CheckoutStepsEnum) {
    this.nextStepSubject.next(targetStep);
  }

  /**
   * * Adiciona ou deleta um débito à lista de débitos selecionados (selectedDebits).
   * @param debit
   */
  @action toggleDebitSelected(debit) {
    const list = this.selectedDebitsSubject.getValue();

    if (list.includes(debit)) {
      list.splice(list.indexOf(debit), 1);
    } else {
      list.push(debit);
    }
  }

  /**
   * * Define se o passo da listagem de débitos foi completado.
   * @param status: boolean (true = completo | falso = incompleto)
   */
  @action setDebitListStepCompletedStatus(status: boolean) {
    this.debitListStepCompletedSubject.next(status);
  }

  /**
   * * Limpa os dados armazenados na storage.
   */
  @action clearData() {
    this.isHtmlVisible = false;
    this.selectedDebitsSubject.next([]);
  }

}
