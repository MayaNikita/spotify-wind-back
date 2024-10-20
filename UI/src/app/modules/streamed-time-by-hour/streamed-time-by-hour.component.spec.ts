import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamedTimeByHourComponent } from './streamed-time-by-hour.component';

describe('StreamedTimeByHourComponent', () => {
  let component: StreamedTimeByHourComponent;
  let fixture: ComponentFixture<StreamedTimeByHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamedTimeByHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamedTimeByHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
