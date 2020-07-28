import { Component, ViewEncapsulation } from '@angular/core';
import { AnimationLoadingStore } from '../../stores/animation-loading.store';
import { interval, Subscriber } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

@Component({
  selector: 'ui-animation-loading',
  templateUrl: './animation-loading.component.html',
  styleUrls: ['./animation-loading.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnimationLoadingComponent {

  colors: Array<String>;
  color: String;
  mode: String;
  value: number;
  diameter: number;
  strokeWidth: number;
  colorsIndex: number;

  // private interval: any;
  // private timeIntervalTake = 200;     // quantidade de loops
  // private timeInterval = 1000;       // tempo de intervalo por loop

  constructor(public animationLoadAction: AnimationLoadingStore) {

    this.colors = ['primary', 'accent', 'warn'];
    this.mode = 'indeterminate';
    this.value = 50;
    this.diameter = 70;
    this.strokeWidth = 10;

    // this.interval = interval(this.timeInterval) // tempo por intervalo
    //   .pipe(
    //     take(this.timeIntervalTake),            // quantidade de intervalos
    //     map(i => {
    //       // console.log('i: ', i);
    //       this.setColors();
    //       return i;
    //     }),
    //     finalize(() => { // quando termina todo o processo de looping do interval
    //       // console.log('fim');
    //       if (this.interval instanceof Subscriber) {
    //         this.interval.unsubscribe();
    //       }
    //     })
    //   ).subscribe();

    this.setColors();
  }

  setColors() {
    if (this.colorsIndex === undefined || this.colorsIndex === this.colors.length - 1) {
      this.colorsIndex = 0;
    } else {
      this.colorsIndex++;
    }
    this.color = this.colors[this.colorsIndex];
  }

}
