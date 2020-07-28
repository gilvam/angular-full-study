import { Injectable } from '@angular/core';
import { action, observable } from 'mobx-angular';

@Injectable()
export class AnimationLoadingStore {

  @observable show: boolean;
  @observable msg: string;

  @action setStart() {
    this.show = true;
  }

  @action setStop() {
    this.show = false;
  }

  @action setMsg(value: string) {
    this.msg = value;
  }
}
