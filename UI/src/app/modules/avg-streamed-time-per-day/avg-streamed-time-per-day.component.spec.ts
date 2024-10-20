import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgStreamedTimePerDayComponent } from './avg-streamed-time-per-day.component';

describe('AvgStreamedTimePerDayComponent', () => {
  let component: AvgStreamedTimePerDayComponent;
  let fixture: ComponentFixture<AvgStreamedTimePerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgStreamedTimePerDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgStreamedTimePerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
