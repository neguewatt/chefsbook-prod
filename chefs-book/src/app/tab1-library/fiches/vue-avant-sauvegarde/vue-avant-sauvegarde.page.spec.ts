import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VueAvantSauvegardePage } from './vue-avant-sauvegarde.page';

describe('VueAvantSauvegardePage', () => {
  let component: VueAvantSauvegardePage;
  let fixture: ComponentFixture<VueAvantSauvegardePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueAvantSauvegardePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VueAvantSauvegardePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
