import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbeiroPainelComponent } from './barbeiro-painel.component';

describe('BarbeiroPainelComponent', () => {
  let component: BarbeiroPainelComponent;
  let fixture: ComponentFixture<BarbeiroPainelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarbeiroPainelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarbeiroPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
