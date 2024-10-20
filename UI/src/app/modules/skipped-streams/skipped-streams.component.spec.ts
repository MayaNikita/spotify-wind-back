import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkippedStreamsComponent } from './skipped-streams.component';

describe('SkippedStreamsComponent', () => {
  let component: SkippedStreamsComponent;
  let fixture: ComponentFixture<SkippedStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkippedStreamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkippedStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
