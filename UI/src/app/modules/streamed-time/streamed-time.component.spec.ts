import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamedTimeComponent } from './streamed-time.component';

describe('StreamedTimeComponent', () => {
  let component: StreamedTimeComponent;
  let fixture: ComponentFixture<StreamedTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamedTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamedTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
