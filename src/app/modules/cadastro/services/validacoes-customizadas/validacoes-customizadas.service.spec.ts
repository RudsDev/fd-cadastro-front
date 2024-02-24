import { TestBed } from '@angular/core/testing';

import { ValidacoesCustomizadasService } from './validacoes-customizadas.service';

describe('ValidacoesCustomizadasService', () => {
  let service: ValidacoesCustomizadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacoesCustomizadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
