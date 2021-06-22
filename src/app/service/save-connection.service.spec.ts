import { TestBed } from '@angular/core/testing';

import { SaveConnectionService } from './save-connection.service';

describe('SaveConnectionService', () => {
  let service: SaveConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
