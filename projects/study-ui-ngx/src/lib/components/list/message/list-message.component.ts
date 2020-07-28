import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss']
})
export class ListMessageComponent implements OnInit {

  @Input() type: string;
  @Input() title: string;
  @Input() msg: string;

  constructor() {
  }

  ngOnInit(): void {
    this.type = this.type ? this.type : '';
    this.title = this.title ? this.title : 'Lista vazia';
    this.msg = this.msg ? this.msg : 'Realize algumas ações referentes a essa página para mostrar uma listagem.';
  }

}
