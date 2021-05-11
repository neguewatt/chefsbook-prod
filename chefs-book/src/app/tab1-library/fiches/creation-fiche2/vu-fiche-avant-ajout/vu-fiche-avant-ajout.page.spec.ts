import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VuFicheAvantAjoutPage } from './vu-fiche-avant-ajout.page';

describe('VuFicheAvantAjoutPage', () => {
  let component: VuFicheAvantAjoutPage;
  let fixture: ComponentFixture<VuFicheAvantAjoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VuFicheAvantAjoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VuFicheAvantAjoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
