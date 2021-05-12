import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FichesPage } from './fiches.page';

describe('FichesPage', () => {
  let component: FichesPage;
  let fixture: ComponentFixture<FichesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FichesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
