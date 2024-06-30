import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarinmuebleComponent } from './agregarinmueble.component';

describe('AgregarinmuebleComponent', () => {
  let component: AgregarinmuebleComponent;
  let fixture: ComponentFixture<AgregarinmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarinmuebleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarinmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
