import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasPendientesComponent } from './ideas-pendientes.component';

describe('IdeasPendientesComponent', () => {
  let component: IdeasPendientesComponent;
  let fixture: ComponentFixture<IdeasPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdeasPendientesComponent]
    });
    fixture = TestBed.createComponent(IdeasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
