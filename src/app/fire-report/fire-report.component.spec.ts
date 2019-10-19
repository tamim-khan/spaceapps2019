import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireReportComponent } from './fire-report.component';

describe('FireReportComponent', () => {
  let component: FireReportComponent;
  let fixture: ComponentFixture<FireReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
