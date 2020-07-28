import { ActionInListEnum } from '../../enums/action-in-list.enum';

export class MoreSubActions {
  id: ActionInListEnum;
  color: string;
  name: string;

  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }
}
