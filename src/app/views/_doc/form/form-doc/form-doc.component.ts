import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from '../../../../_shared/base.component';
import { UserService } from '../../../../services/http/user.service';
import { CoreValidators } from 'study-core-ngx';
import { ValidatorAsync } from '../../../../_shared/validators/validator-async.validator';
import { ValidatorCustom } from '../../../../_shared/validators/validator-custom.validator';

@Component({
  selector: 'app-form-doc',
  templateUrl: './form-doc.component.html',
  styleUrls: ['./form-doc.component.scss'],
})
export class FormDocComponent extends BaseComponent implements OnInit {

  hidePassOld = false;
  hidePassNew = false;
  hidePassConf = false;

  profileItemList = [
    { name: 'Administrador', nickName: 'ADM', idCustom: 'A', id: 1 },
    { name: 'Gestor', nickName: 'GESTS', idCustom: 'B', id: 2 },
    { name: 'Cliente', nickName: 'CLI', idCustom: 'C', id: 3 },
    { name: 'Operador', nickName: 'OPER', idCustom: 'D', id: 4 },
    { name: 'Financeiro', nickName: 'FIN', idCustom: 'E', id: 5 },
    { name: 'N2', nickName: 'N-2', idCustom: 'F', id: 6 },
    { name: 'Parceiro', nickName: 'PAR', idCustom: 'G', id: 7 },
    { name: 'Comercial', nickName: 'COMERC', idCustom: 'H', id: 8 },
  ];

  constructor(
    private userService: UserService,
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      name: ['', { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(13)] }],
      email: [null,
        Validators.compose([Validators.required, Validators.email]),
        ValidatorAsync.asyncEmailRegistered(this.userService, this.formErrorService),
      ],
      passwordOld: [null, [CoreValidators.passwordMatchOld, Validators.minLength(3)]],
      password: [null, [CoreValidators.passwordMatch, Validators.minLength(3)]],
      passwordConfirm: [null, [CoreValidators.passwordMatchConfirm, Validators.minLength(3)]],
      profiles: [null, [ValidatorCustom.onlyProfileSimple]],
      gender: [null, Validators.required],
      isActivate: [true],
      hasSpecialNeeds: [false, { updateOn: 'change' }], // atualiza o campo com validações quando o seu valor sofre alteração
      isNotifications: [false, { updateOn: 'change' }],
      description: ['', { validators: Validators.maxLength(250), updateOn: 'change' }],
      // dateDirthday: ['', Validators.required],
      dateX: ['', { validators: Validators.required, updateOn: 'change' }],

      phone: ['', Validators.required],
      plate: ['', Validators.required],
    });
    // }, { updateOn: 'blur' }); // atualiza os campos com validaçoes quando o seu valor sofre alteração e passa para o próximo
  }

  ngOnInit() {
  }

  save() {
    if (!this.formGroup.valid) {
      this.formCheckErrors(); // mostrar todos os erros
      this.snackBar.danger('Existem erros no formulário de login');
      return;
    }
    this.snackBar.show('Salvo com sucesso!');
  }
}
