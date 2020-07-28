import { TestBed } from '@angular/core/testing';

import { StudyUiNgxService } from './study-ui-ngx.service';

describe('StudyUiNgxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudyUiNgxService = TestBed.get(StudyUiNgxService);
    expect(service).toBeTruthy();
  });
});
