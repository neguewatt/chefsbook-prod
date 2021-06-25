import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FcmService } from './fcm.service';

describe('FcmService', () => {
  let service: FcmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(FcmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
