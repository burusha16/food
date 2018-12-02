import { TestBed } from '@angular/core/testing';

import { ContentPreloadService } from './content-preload.service';

describe('ContentPreloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentPreloadService = TestBed.get(ContentPreloadService);
    expect(service).toBeTruthy();
  });
});
