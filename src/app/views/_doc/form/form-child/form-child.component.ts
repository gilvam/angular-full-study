import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../_shared/base.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-child',
  templateUrl: './form-child.component.html',
  styleUrls: ['./form-child.component.scss'],
})
export class FormChildComponent extends BaseComponent implements OnInit {

  stateList = [
    { id: 1, initial: 'AC', name: 'Acre' },
    { id: 2, initial: 'AL', name: 'Alagoas' },
    { id: 3, initial: 'AM', name: 'Amazonas' },
    { id: 4, initial: 'AP', name: 'Amapá' },
  ];

  actionsList = ['edit', 'create', 'list', 'gg 777'];

  constructor() {
    super();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      address: this.formBuilder.group({
        streetName: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.minLength(8)]],
        states: ['', Validators.required],
        actions: ['', Validators.required],
      }),
    });
  }

  save() {
    if (!this.formGroup.valid) {
      this.formCheckErrors(); // mostrar todos os erros
      this.snackBar.danger('Existem erros no formulário de login');
      return;
    }
    this.snackBar.show('Salvo com sucesso!');
    this.formGroup.reset(); // limpa todos os campos
  }
}

