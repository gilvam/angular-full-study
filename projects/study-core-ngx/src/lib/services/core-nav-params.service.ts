import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Injectable({ providedIn: 'root' })
export class CoreNavParamsService {

  nav = {
    start: { opened: false },
    end: { opened: false },
    over: 'side',
    mqAlias: null,
  };

  constructor(
    private mediaObserver: MediaObserver,
  ) {
    mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      changes.map(change => {
        if (change.mqAlias.length === 2) {
          if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
            this.nav.start.opened = false;
            this.nav.over = 'over';
          } else {
            this.nav.start.opened = true;
            this.nav.over = 'side';
          }
          this.nav.mqAlias = change.mqAlias;
        }
      });
    });
  }

}
