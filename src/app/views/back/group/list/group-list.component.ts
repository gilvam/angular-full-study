import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../_shared/base.component';
import { GroupModel } from '../../../../models/group.model';
import { GroupService } from '../../../../services/http/group.service';
import { GroupListFilterComponent } from './filter/group-list-filter.component';
import { UserModel } from '../../../../models/user.model';
import { ActionInListEnum, FormGroupActionModel, MenuActionCheck, MenuActionMoreOption, MoreSubActions, PageModel } from 'study-core-ngx';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent extends BaseComponent implements OnInit {

  page: PageModel<UserModel> = new PageModel<UserModel>();
  groups: Array<GroupModel>;
  menuActionCheck: any; // mostrar checkbox no paginate
  selectedList = new Array<any>();

  constructor(
    public groupService: GroupService,
  ) {
    super();

    this.menuActionStore.setFilter(GroupListFilterComponent).subscribe((filter: FormGroupActionModel) =>
      this.loadPagination(true)
    );

    // more actions
    this.menuActionStore.setMoreOptions(
      new MenuActionMoreOption(ActionInListEnum.CLONE, 'filter_none', 'clonar'),
      new MenuActionMoreOption(ActionInListEnum.MULTIPLE_ACTION, 'exposure_plus_2', 'Ações múltiplas',
        [
          new MoreSubActions('primary', 'renomear'),
          new MoreSubActions('warn', 'mesclar')
        ]
      )).subscribe((item: MenuActionMoreOption | MoreSubActions | MenuActionCheck) => {
      this.menuActionCheck = item;
      if (item instanceof MoreSubActions) {
        if (item.name === 'renomear') {
          console.log('renomear itens:', this.selectedList);
        } else if (item.name === 'mesclar') {
          console.log('mesclar itens ', item, ' | ', this.selectedList);
        } else if (item.name === 'clonar') {
          console.log('clonar itens ', item, ' | ', this.selectedList);
        }
        this.snackBar.show(`Sem ações para ${ item.id } | ${ item.name }`);
      }
    });
  }

  ngOnInit(): void {
  }

  loadPagination(isResetPagination: boolean = false) {
    if (this.page.loadingMore(isResetPagination)) {
      this.groupService.getAll().subscribe((page: PageModel<GroupModel>[]) => {
          const pageResult = page.find((pg: PageModel<GroupModel>, i) => i === this.page.number);
          this.page.updatePagination(pageResult, false);
          this.groups = this.page.first ? pageResult.content : this.groups.concat(pageResult.content);
        }
      );
    }
  }

  getSelects(items: any) {
    this.selectedList = items;
  }

  create() {
    this.snackBar.show('Sem ações para criar no momento');
  }

  edit(i: number) {
    this.snackBar.show(`Sem ações para editar "${this.groups[i].name}" no momento`);
  }

  config(i: number) {
    this.snackBar.show(`Sem ações para configurar "${this.groups[i].name}" no momento`);
  }
}
