import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesPendientesComponent } from './hobbies-pendientes.component';

describe('HobbiesPendientesComponent', () => {
  let component: HobbiesPendientesComponent;
  let fixture: ComponentFixture<HobbiesPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbiesPendientesComponent]
    });
    fixture = TestBed.createComponent(HobbiesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
