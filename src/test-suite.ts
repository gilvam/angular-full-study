import { TestBed, ComponentFixture, getTestBed } from '@angular/core/testing';


/**
 * Mantem modules factories compilados e recria apenas os componentes e serviços necessários para o teste.
 * ( O Angular reinicia os módulos de teste a cada execução, ou seja, ele limpa todos os seus module factories, módulos e fixture ativos. )
 *
 * -- by: https://medium.com/@michael.silva/aumentando-a-velocidade-dos-testes-com-karma-e-angular-72a665592b58
 */
export class TestSuite {
  static configure() {
    const testBedApi: any = getTestBed();
    const originReset = TestBed.resetTestingModule;

    beforeAll(() => {
      TestBed.resetTestingModule();
      TestBed.resetTestingModule = () => TestBed;
    });

    afterEach(() => {
      testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
      testBedApi._instantiated = false;
    });

    afterAll(() => {
      TestBed.resetTestingModule = originReset;
      TestBed.resetTestingModule();
    });
  }
}
