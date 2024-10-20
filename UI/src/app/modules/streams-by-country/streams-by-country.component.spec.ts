import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamsByCountryComponent } from './streams-by-country.component';

describe('StreamsByCountryComponent', () => {
  let component: StreamsByCountryComponent;
  let fixture: ComponentFixture<StreamsByCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamsByCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamsByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
