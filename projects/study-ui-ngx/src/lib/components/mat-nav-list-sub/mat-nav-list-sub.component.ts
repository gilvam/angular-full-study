import { AfterViewInit, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavListSubmenuModel } from 'study-core-ngx';

@Component({
  selector: 'ui-mat-nav-list-sub',
  templateUrl: './mat-nav-list-sub.component.html',
  styleUrls: ['./mat-nav-list-sub.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatNavListSubComponent implements AfterViewInit {

  @ViewChild('container', { static: false }) container;
  @Input() menu: Array<NavListSubmenuModel>;

  private isMouseLeave: boolean;

  constructor() {
    // this.menu = <Array<NavListSubmenuModel>> this.menu;
  }

  ngAfterViewInit(): void {
  }

  opened(item: NavListSubmenuModel) {
    if (this.isMouseLeave) {
      item.isOpened = !item.isOpened;
    }
    this.isMouseLeave = true;
  }

  onMouseEnter(item: NavListSubmenuModel) {
    item.isOpened = !item.isOpened;
  }

  onMouseLeave(item: NavListSubmenuModel) {
    item.isOpened = false;
    this.isMouseLeave = false;
  }

  clickSubMenu(item: NavListSubmenuModel) {
    this.onMouseLeave(item);
  }
}
