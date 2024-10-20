import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgStreamedTimeByWeekdayComponent } from './avg-streamed-time-by-weekday.component';

describe('AvgStreamedTimeByWeekdayComponent', () => {
  let component: AvgStreamedTimeByWeekdayComponent;
  let fixture: ComponentFixture<AvgStreamedTimeByWeekdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgStreamedTimeByWeekdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgStreamedTimeByWeekdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
