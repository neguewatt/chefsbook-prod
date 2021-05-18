import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SauvegardePlatPage } from './sauvegarde-plat.page';

describe('SauvegardePlatPage', () => {
  let component: SauvegardePlatPage;
  let fixture: ComponentFixture<SauvegardePlatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SauvegardePlatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SauvegardePlatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
