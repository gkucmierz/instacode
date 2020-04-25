import { TestBed } from '@angular/core/testing';

import { OutputService } from './output.service';

describe('OutputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutputService = TestBed.get(OutputService);
    expect(service).toBeTruthy();
  });
});
