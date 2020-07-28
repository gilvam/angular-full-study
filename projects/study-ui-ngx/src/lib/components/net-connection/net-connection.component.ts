import { Component, OnDestroy } from '@angular/core';
import { interval, Subscriber } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ui-net-connection',
  templateUrl: './net-connection.component.html',
  styleUrls: ['./net-connection.component.scss'],
})
export class NetConnectionComponent implements OnDestroy {

  private interval: any;
  isOnline: boolean;

  constructor(
    private matSnackBar: MatSnackBar,
  ) {
    this.setInterval();
  }

  private setInterval() {
    this.isOnline = true;

    if (this.interval instanceof Subscriber) {
      this.interval.unsubscribe();
    }

    this.interval = interval(5000) // tempo por intervalo
      .pipe(
        // take(this.timeIntervalTake),
        map(i => {
          // console.log('i: ', i, navigator.onLine);
          if (this.isOnline && !navigator.onLine) {
            this.openSnackOffLine();
          }
          this.isOnline = navigator.onLine;

          return i;
        }),
      )
      .subscribe();
  }

  openSnackOffLine() {
    this.matSnackBar.open(
      'Sem conexão com a internet',
      null,
      { duration: 2000, panelClass: `mat-snackbar-warning` },
    );
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }
}
