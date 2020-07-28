import { ActionInListEnum } from '../../enums/action-in-list.enum';
import { MoreSubActions } from './more-sub-actions.model';

export class MenuActionMoreOption {
  id: ActionInListEnum;
  icon: string;
  name: string;
  subActions: Array<MoreSubActions>;

  constructor(id: ActionInListEnum, icon: string, name: string, subActions?: Array<MoreSubActions>) {

    // caso não tenha SubAction, cria o btn com o mesmo nome do MenuActionMoreOption
    subActions = subActions ? subActions : [new MoreSubActions(null, name)];
    // passa id do MenuActionMoreOption para o MoreSubActions
    subActions.map((sub: MoreSubActions) => sub.id = id); // adiciona ActionInListEnum

    this.id = id;
    this.icon = icon;
    this.name = name;
    this.subActions = subActions;
  }
}
