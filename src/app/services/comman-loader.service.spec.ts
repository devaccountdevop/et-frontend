import { TestBed } from '@angular/core/testing';

import { CommanLoaderService } from './comman-loader.service';

describe('CommanLoaderService', () => {
  let service: CommanLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommanLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
