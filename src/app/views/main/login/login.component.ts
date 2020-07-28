import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/http/auth.service';
import { Validators } from '@angular/forms';
import { BaseComponent } from '../../../_shared/base.component';
import { CoreValidators } from 'study-core-ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    super();

    this.authService.logout();

    // retorna a rota anterior quando não estava logado ou a padrão '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['email@mail.com', [Validators.email, Validators.required]],
      password: ['123', [CoreValidators.passwordMatch]],
    });
  }

  login() {
    if (this.formGroup.invalid) {
      this.formCheckErrors(); // mostrar todos os erros;
      return;
    }

    this.authService.login(this.formGroup.get('email').value, this.formGroup.get('password').value)
      .subscribe((responseUser) => {
        this.authService.setLocalStorage(responseUser);
        this.snackBar.show(`Bem vindo de volta`);
        this.coreRouter.navigate([this.returnUrl]);
      }, error => {
        this.snackBar.danger(`Usuário ou senha inválidos`);
      });
  }
}
