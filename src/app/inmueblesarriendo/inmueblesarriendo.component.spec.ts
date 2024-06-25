import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmueblesarriendoComponent } from './inmueblesarriendo.component';

describe('InmueblesarriendoComponent', () => {
  let component: InmueblesarriendoComponent;
  let fixture: ComponentFixture<InmueblesarriendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InmueblesarriendoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmueblesarriendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
