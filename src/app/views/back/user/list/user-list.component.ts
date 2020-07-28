import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from '../../../../services/http/user.service';
import { BaseComponent } from '../../../../_shared/base.component';
import { UserModel } from '../../../../models/user.model';
import { UserNewDialogComponent } from '../new/user-new-dialog.component';
import { FormGroup } from '@angular/forms';
import { UserEditDialogComponent } from '../edit/user-edit-dialog.component';
import { UserListFilterComponent } from '../filter-menu-action/user-list-filter.component';
import {
  ActionInListEnum,
  DialogPanelClassEnum,
  FormGroupActionModel,
  MenuActionCheck,
  MenuActionMoreOption,
  MoreSubActions,
  PageModel,
} from 'study-core-ngx';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends BaseComponent implements OnInit {

  @ViewChild('matSelectionList', { static: true }) matSelectionList;

  page: PageModel<UserModel> = new PageModel<UserModel>();
  users: Array<UserModel>;
  menuActionCheck: any; // mostrar checkbox no paginate
  selectedList = new Array<any>();

  constructor(
    public matDialog: MatDialog,
    public userService: UserService,
  ) {
    super();

    // filter
    this.menuActionStore.setFilter(UserListFilterComponent).subscribe((filter: FormGroupActionModel) => {
      this.loadPagination(true, filter);
    });

    // more actions
    this.menuActionStore.setMoreOptions(
      new MenuActionMoreOption(ActionInListEnum.CLONE, 'filter_none', 'clonar'),
      new MenuActionMoreOption(ActionInListEnum.MULTIPLE_ACTION, 'exposure_plus_2', 'Ações múltiplas',
        [
          new MoreSubActions('primary', 'renomear'),
        ],
      )).subscribe((item: MenuActionMoreOption | MoreSubActions | MenuActionCheck) => {
      this.menuActionCheck = item;
      if (item instanceof MoreSubActions) {
        if (item.name === 'renomear') {
          console.log('renomear itens:', this.selectedList);
        } else if (item.name === 'clonar') {
          console.log('clonar itens ', item, ' | ', this.selectedList);
        }
        this.snackBar.show(`Sem ações para ${ item.id } | ${ item.name }`);
      }
    });
  }

  ngOnInit(): void {
  }

  loadPagination(isResetPagination: boolean = false, formActionsParams?: FormGroupActionModel) {
    // if (this.page.loadingMore(isResetPagination)) {
    //   // Rsql
    //   let params: HttpParams = new HttpParams();
    //   if (formActionsParams) {
    //     formActionsParams.like('name');
    //     formActionsParams.like('email');
    //     formActionsParams.like('mobile');
    //     params = formActionsParams.toHttpParams(params);
    //   }
    //
    //   this.userService.findAll(params, { page: this.page.number }, { size: this.page.size }).subscribe((page: PageModel<UserModel>) => {
    //     this.page.updatePagination(page, false);
    //     this.users = this.page.first ? page.content : this.users.concat(page.content);
    //   });
    // }
    this.userService.getAll().subscribe((page: PageModel<UserModel>[]) => {
        const pageResult = page.find((pg: PageModel<UserModel>, i) => i === this.page.number);
        this.page.updatePagination(pageResult, false);
        this.users = this.page.first ? pageResult.content : this.users.concat(pageResult.content);
      },
    );
  }

  getSelects(items: any) {
    this.selectedList = items;
  }

  create() {
    this.matDialog.open(UserNewDialogComponent, { panelClass: DialogPanelClassEnum.sm }).afterClosed()
      .subscribe((formGroup: FormGroup) => {
        if (formGroup) {
          this.userService.create(formGroup).subscribe(response => {
            this.users.unshift(formGroup.value); // adiciona na listagem
            this.snackBar.show('Usuário adicionado'); // mensagem de sucesso
          });
        }
      });
  }

  edit(i: number) {
    this.matDialog.open(UserEditDialogComponent, { panelClass: DialogPanelClassEnum.sm, data: this.users[i] }).afterClosed()
      .subscribe((formGroup: FormGroup) => {
        if (formGroup) {
          this.userService.update(formGroup).subscribe(response => {
            this.users[i] = formGroup.value; // atualiza na listagem
            this.snackBar.show('Usuário atualizado'); // mensagem de sucesso
          });
        }
      });
  }

  delete(i: number) {
    this.dialog.danger('Atenção', `Tem certeza que deseja excluir o usuário "${ this.users[i].name }" ?`, 'Sim', 'não')
      .subscribe(result => {
        if (result) {
          this.userService.delete(i).subscribe(response => {
            this.snackBar.show('Usuário removido'); // mensagem de sucesso
          });
        }
      });
  }
}
