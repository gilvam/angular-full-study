import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCoreNgxComponent } from './study-core-ngx.component';

describe('StudyCoreNgxComponent', () => {
  let component: StudyCoreNgxComponent;
  let fixture: ComponentFixture<StudyCoreNgxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyCoreNgxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCoreNgxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
