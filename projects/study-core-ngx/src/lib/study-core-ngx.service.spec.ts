import { TestBed } from '@angular/core/testing';

import { StudyCoreNgxService } from './study-core-ngx.service';

describe('StudyCoreNgxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudyCoreNgxService = TestBed.get(StudyCoreNgxService);
    expect(service).toBeTruthy();
  });
});
