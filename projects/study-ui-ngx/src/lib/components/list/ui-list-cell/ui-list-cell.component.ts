import { Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { UiPaginateComponent } from '../paginate/ui-paginate.component';

@Component({
  selector: 'ui-list-cell',
  templateUrl: './ui-list-cell.component.html',
  styleUrls: ['./ui-list-cell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UiListCellComponent {

  @Input() title: string | number;

  constructor(
    @Optional() public uiPaginateComponent: UiPaginateComponent // component parent
  ) {
  }

}
