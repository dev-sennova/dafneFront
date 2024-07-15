import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosPendientesComponent } from './criterios-pendientes.component';

describe('CriteriosPendientesComponent', () => {
  let component: CriteriosPendientesComponent;
  let fixture: ComponentFixture<CriteriosPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriteriosPendientesComponent]
    });
    fixture = TestBed.createComponent(CriteriosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
