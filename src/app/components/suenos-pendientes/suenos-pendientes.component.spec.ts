import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuenosPendientesComponent } from './suenos-pendientes.component';

describe('SuenosPendientesComponent', () => {
  let component: SuenosPendientesComponent;
  let fixture: ComponentFixture<SuenosPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuenosPendientesComponent]
    });
    fixture = TestBed.createComponent(SuenosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
