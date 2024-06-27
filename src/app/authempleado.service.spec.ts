import { TestBed } from '@angular/core/testing';

import { AuthempleadoService } from './authempleado.service';

describe('AuthempleadoService', () => {
  let service: AuthempleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthempleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
