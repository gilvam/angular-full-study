import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getBottonText() {
    return element(by.css('mat-card-actions .mat-button-wrapper')).getText() as Promise<string>;
  }
}
