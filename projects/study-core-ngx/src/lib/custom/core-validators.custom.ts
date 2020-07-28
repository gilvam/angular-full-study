import { FormControl, Validators } from '@angular/forms';

export class CoreValidators extends Validators {

  /**
   * validação de caracteres
   */
  static validateCharacters(control: FormControl) {
    const invalidCharacters = /[^\s\w,.:&\/()+%'`@-]/; // white listed characters

    // first check if the control has a value
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(invalidCharacters); // procura coincidir com o valor de de entrada contra a expressão regular

      return matches && matches.length ? { invalidCharacters: matches[0] } : null;
    } else {
      return null;
    }
  }

  /**
   * invalid
   * - usado para setar um campo como inválido ( interessante usar quando se precisa setar um campo com erros dinamicamente )
   */
  static invalid(control: FormControl) {
    return { invalid: 'Campo inválido' };
  }

  /**
   * passwordOld
   * - se o valor for igual a nova senha ou confirmar senha, lança erro
   */
  static passwordMatchOld(passwordOld: FormControl) {
    if (passwordOld.parent) {
      const password = passwordOld.parent.get('password');
      const passwordConfirm = passwordOld.parent.get('passwordConfirm');

      if (!passwordOld.value) {
        return { passwordMatchConfirm: 'Senha antiga necessária' };
      } else if (
        (password && (passwordOld.value === password.value)) ||
        (passwordConfirm && (passwordOld.value === passwordConfirm.value))
      ) {
        return { passwordMatchOld: 'Senha antiga não pode ser igual a nova senha' };
      } else {
        if (password && password.status === 'INVALID') {
          password.setValue(password.value);
        }
        if (passwordConfirm && passwordConfirm.status === 'INVALID') {
          passwordConfirm.setValue(passwordConfirm.value);
        }
      }
    }
    return null;
  }

  /**
   * password
   * - valida se password é invalido
   * - valida se existe um campo de verificação de senha e lança erro se valor diferente
   * - valida se existe um campo de senha antiga e se o valor é diferente
   */
  static passwordMatch(password: FormControl) {
    if (password.parent) {
      const passwordConfirm = password.parent.get('passwordConfirm');
      const passwordOld = password.parent.get('passwordOld');

      // se password vazio
      if (!password.value) {
        return { passwordMatchConfirm: 'Senha necessária' };
      }
      // se existe passwordOld
      else if (passwordOld && passwordOld.value === password.value) {
        return { passwordOldEqual: 'Nova senha igual a senha antiga' };
      }
      // se existe passwordConfirm
      else if (passwordConfirm) {
        if (password.value !== passwordConfirm.value && passwordConfirm.value) { // se passwordConfirm diferente de password
          return { passwordMatchConfirm: 'Diferente da confirmação' };
        }
        // se valores iguais e passwordConfirm invalido, atualiza passwordConfirm apenas para setar o mesmo como valido
        else if (password.value === passwordConfirm.value && passwordConfirm.status === 'INVALID') {
          passwordConfirm.setValue(password.value);
        }
      }
      // se passwordOld invalido, atualiza passwordConfirm apenas para setar o mesmo como valido
      else if (passwordOld && passwordOld.status === 'INVALID') {
        passwordOld.setValue(passwordOld.value);
      }
    }
    return null;
  }

  /**
   * passwordMatchConfirm - mesma lógica do passwordMatch
   */
  static passwordMatchConfirm(passwordConfirm: FormControl) {
    if (passwordConfirm.parent) {
      const password = passwordConfirm.parent.get('password');
      const passwordOld = password.parent.get('passwordOld');

      if (!passwordConfirm.value) {
        return { passwordMatchConfirm: 'Confirmação de senha necessária' };
      } else if (passwordOld && passwordOld.value === passwordConfirm.value) {
        return { passwordOldEqual: 'Confirmação igual a senha antiga' };
      } else if (passwordConfirm.value !== password.value && password.value) {
        return { passwordMatchConfirm: 'Diferente de nova senha' };
      } else if (passwordConfirm.value === password.value && password.status === 'INVALID') {
        password.setValue(passwordConfirm.value);
      } else if (passwordOld && passwordOld.status === 'INVALID') {
        passwordOld.setValue(passwordOld.value);
      }
    }
    return null;
  }
}
