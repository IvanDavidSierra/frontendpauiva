import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenucomercialComponent } from './menucomercial.component';

describe('MenucomercialComponent', () => {
  let component: MenucomercialComponent;
  let fixture: ComponentFixture<MenucomercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenucomercialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenucomercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
