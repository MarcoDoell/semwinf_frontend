import { TestBed } from '@angular/core/testing';

import { TreeServiceService } from './tree-service.service';

describe('TreeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeServiceService = TestBed.get(TreeServiceService);
    expect(service).toBeTruthy();
  });
});
