import { Component } from '@angular/core';
import { BaseComponent } from '../../_shared/base.component';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent extends BaseComponent {

  constructor() {
    super();
  }

  /**
   * DIALOG
   */

  dialogVerificationNoNames() {
    this.dialog.show('Apenas mensagem', 'Tem certeza que deseja realizar a ação XYz ?');
  }

  dialogVerificationSimple() {
    const dialog = this.dialog.show('Nome botões', 'Tem certeza que deseja realizar a ação XYz ?',
      'Ação 1', 'cancelar 1');

    dialog.subscribe(result => {
      console.log('Dialog fechado. Retorno: ', result);
    });
  }

  dialogVerificationSimpleDialogBtnString() {
    const dialog = this.dialog.show('Nome botões com objeto', 'Tem certeza que deseja realizar a ação XYz ?',
      null, 'cancelar 2');

    dialog.subscribe(result => {
      console.log('Dialog fechado. Retorno: ', result);
    });
  }

  dialogVerificationSimpleDialogBtnAllParams() {
    const dialog = this.dialog.show('Nome botões com objeto e visiveis/invisíveis', 'Tem certeza que deseja realizar a ação XYz ?',
      'Ação 3', 'cancelar 3');

    dialog.subscribe(result => {
      console.log('Dialog fechado. Retorno: ', result);
    });
  }

  dialogVerificationSuccess() {
    const dialog = this.dialog.success('Sucesso! :)', 'Sucesso meu amigo', 'Blz Parceiro!', 'voltar');

    dialog.subscribe(result => {
      console.log('%c, Dialog success fechado.', 'color: #00c851', 'retorno: ', result);
    });
  }

  dialogVerificationDanger() {
    const dialog = this.dialog.danger('Erro! :(', 'Algo de errado não está certo....', 'Ok...', 'voltar');

    dialog.subscribe(result => {
      console.log('%c, Dialog danger fechado.', 'color: #ff3547', 'retorno: ', result);
    });
  }

  dialogVerificationWarning() {
    const dialog = this.dialog.warning('Aviso! :S', 'Um pouco mais de atenção nessa parte....', 'Tudo bem!', 'voltar');

    dialog.subscribe(result => {
      console.log('%c, Dialog warning fechado.', 'color: #fb3', 'retorno: ', result);
    });
  }

  dialogVerificationInfo() {
    const dialog = this.dialog.info('Informação! o.O', 'No momento é só um alerta informativo. Pode ficar tranquilo parceiro.',
      'Beleza!', 'voltar');

    dialog.subscribe(result => {
      console.log('%c, Dialog info fechado.', 'color: #33b5e5', 'retorno: ', result);
    });
  }


  /**
   * SNACK BAR
   */

  snackBarVerification() {
    const snack = this.snackBar.show('Msg default!');
  }

  snackBarVerificationAction() {
    const snack = this.snackBar.show('Msg default!', 'Ação');
    snack.subscribe(result => {
      console.log('%c, snackBar default ACTION!', 'color: #45475d');
    });
  }

  snackBarVerificationSuccess() {
    const snack = this.snackBar.success('Sucesso meu amigo', 'visualizar');

    snack.subscribe(result => {
      console.log('%c, snackBar success ACTION!', 'color: #00c851');
    });
  }

  snackBarVerificationDanger() {
    const snack = this.snackBar.danger('Algo de errado não está certo....', 'onde?');

    snack.subscribe(result => {
      console.log('%c, snackBar danger ACTION!', 'color: #ff3547');
    });
  }

  snackBarVerificationWarning() {
    const snack = this.snackBar.warning('Um pouco mais de atenção nessa parte....', 'verificar');

    snack.subscribe(result => {
      console.log('%c, snackBar warning ACTION!', 'color: #fb3');
    });
  }

  snackBarVerificationInfo() {
    const snack = this.snackBar.info('No momento é só um alerta informativo. Pode ficar tranquilo parceiro.', 'consultar');

    snack.subscribe(result => {
      console.log('%c, snackBar info ACTION!', 'color: #33b5e5');
    });
  }
}
