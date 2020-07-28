import { AsyncValidatorFn, FormControl, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import { CoreFormErrorService } from 'study-core-ngx';
import { UserService } from '../../services/http/user.service';

/**
 * Validações muito específicas do sistema com consulta REST e/ou assíncronas
 */
export class ValidatorAsync extends Validators {

  /**
   * verifica se email existe no back-end
   */
  static asyncEmailRegistered(userService: UserService, formErrorService: CoreFormErrorService): AsyncValidatorFn {
    return (fControl: FormControl): Observable<{ [key: string]: any } | null> => {
      return timer(1000)
        .pipe(
          switchMap(() => {
            return userService.findByEmail(fControl.value)
              .pipe(map(responseUser => {
                if (responseUser) {
                  formErrorService.validateFormControl(fControl, 'email'); // atualiza error na view
                  return { emailRegistered: 'Email já cadastrado' };
                }
              }));
          }),
        );
    };
  }

}
