import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader-service.service';

describe('StepServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderService = TestBed.get(LoaderService);
    expect(service).toBeTruthy();
  });
});
