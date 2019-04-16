import { TestBed } from '@angular/core/testing';

import { PayableService } from './payable.service';

describe('PayableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayableService = TestBed.get(PayableService);
    expect(service).toBeTruthy();
  });
});
