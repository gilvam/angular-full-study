import { DialogBtnTypeEnum } from 'study-core-ngx';

export class DialogButtonModel {
  public isVisible?: boolean;
  public text?: string;

  public constructor(text?: string, isVisible: boolean = true, dialogBtnTypeEnum?: DialogBtnTypeEnum) {
    this.isVisible = isVisible;
    this.text = text ? text : dialogBtnTypeEnum;

    if (text === null) {
      this.isVisible = false;
    }
    if (text) {
      this.text = text;
    }
    if (!text && dialogBtnTypeEnum === DialogBtnTypeEnum.BTN_CANCEL_TEXT) {
      this.isVisible = false;
    }
  }

  public setIfNotComplet(dialogBtnTypeEnum: DialogBtnTypeEnum) {
    this.text = this.text ? this.text : dialogBtnTypeEnum; // se não existe um texto para o btn, é utilizado o texto padrão do btn
    return this;
  }
}
