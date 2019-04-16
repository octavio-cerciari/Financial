import { TestBed } from '@angular/core/testing';

import { BankCardService } from './bank-card.service';

describe('BankCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankCardService = TestBed.get(BankCardService);
    expect(service).toBeTruthy();
  });
});
