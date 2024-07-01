import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroinmuebleComponent } from './registroinmueble.component';

describe('RegistroinmuebleComponent', () => {
  let component: RegistroinmuebleComponent;
  let fixture: ComponentFixture<RegistroinmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroinmuebleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroinmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
