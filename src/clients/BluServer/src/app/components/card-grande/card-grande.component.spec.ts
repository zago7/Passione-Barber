import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGrandeComponent } from './card-grande.component';

describe('CardGrandeComponent', () => {
  let component: CardGrandeComponent;
  let fixture: ComponentFixture<CardGrandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGrandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGrandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
