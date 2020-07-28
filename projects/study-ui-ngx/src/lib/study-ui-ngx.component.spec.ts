import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyUiNgxComponent } from './study-ui-ngx.component';

describe('StudyUiNgxComponent', () => {
  let component: StudyUiNgxComponent;
  let fixture: ComponentFixture<StudyUiNgxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyUiNgxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyUiNgxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
