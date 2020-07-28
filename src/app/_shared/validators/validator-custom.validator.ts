import { FormControl, Validators } from '@angular/forms';

/**
 * Validações muito específicas do sistema
 */
export class ValidatorCustom extends Validators {

  /**
   * onlyProfileSimple - Apenas para demonstração de uma validação customizada
   * - se seleção contém gestor (id: 2) e cliente (id: 3) na mesma seleção
   */
  static onlyProfileSimple(control: FormControl) {
    if (control.value && control.value.length && control.value.includes(2) && control.value.includes(3)) {
      return { onlyProfileSimple: 'Cliente e Gestor não compatíveis' };
    }
  }
}
