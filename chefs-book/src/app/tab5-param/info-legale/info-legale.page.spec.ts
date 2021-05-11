import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoLegalePage } from './info-legale.page';

describe('InfoLegalePage', () => {
  let component: InfoLegalePage;
  let fixture: ComponentFixture<InfoLegalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoLegalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoLegalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
