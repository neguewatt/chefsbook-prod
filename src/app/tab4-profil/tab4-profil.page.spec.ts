import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab4ProfilPage } from './tab4-profil.page';

describe('Tab4Page', () => {
  let component: Tab4ProfilPage;
  let fixture: ComponentFixture<Tab4ProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab4ProfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab4ProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
