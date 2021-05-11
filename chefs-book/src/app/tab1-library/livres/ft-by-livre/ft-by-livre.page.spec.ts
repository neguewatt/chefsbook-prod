import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FtByLivrePage } from './ft-by-livre.page';

describe('FtByLivrePage', () => {
  let component: FtByLivrePage;
  let fixture: ComponentFixture<FtByLivrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtByLivrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FtByLivrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
