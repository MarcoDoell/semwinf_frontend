import { TestBed } from '@angular/core/testing';

import { StepServiceService } from './step-service.service';

describe('StepServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepServiceService = TestBed.get(StepServiceService);
    expect(service).toBeTruthy();
  });
});
