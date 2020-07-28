import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-row',
  templateUrl: './layout-row.component.html',
  styleUrls: ['./layout-row.component.scss']
})
export class LayoutRowComponent implements OnInit {

  cardList: Array<{ imgSrc: string; title: string; description: string; style: any }> = [];

  style = [
    { 'backgroundColor': '#0cd1e8' },
    { 'backgroundColor': 'thistle' },
    { 'backgroundColor': '#7dbca9' },
    { 'backgroundColor': 'gold' },
    // { 'backgroundColor': 'antiquewhite' },
    // { 'backgroundColor': 'burlywood' }
  ];


  ngOnInit() {
    for (let i = 0; i <= this.style.length - 1; i++) {
      this.cardList.push({
        imgSrc: `https://placeimg.com/20${ i }/50/any`,
        title: 'Card No. ' + i,
        description: 'Lorem ipsum dolor sit amet, consec tetur adipisicing elit.',
        style: this.style[i]
      });
    }

    console.log('this.cardList: ', this.cardList);
  }
}
