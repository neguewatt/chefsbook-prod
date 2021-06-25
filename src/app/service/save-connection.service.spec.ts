import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SaveConnectionService } from './save-connection.service';

describe('SaveConnectionService', () => {
  let service: SaveConnectionService;

  // Pour fixer l'injection null du storage, il faut mocker son storage :
  //https://stackoverflow.com/questions/55813831/ionic-4-creating-mock-storage
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ]
    });
    service = TestBed.inject(SaveConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
