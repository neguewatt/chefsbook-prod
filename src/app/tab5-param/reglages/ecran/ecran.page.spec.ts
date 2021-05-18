import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EcranPage } from './ecran.page';

describe('EcranPage', () => {
  let component: EcranPage;
  let fixture: ComponentFixture<EcranPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcranPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EcranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
