import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChargementPage } from './chargement.page';

describe('ChargementPage', () => {
  let component: ChargementPage;
  let fixture: ComponentFixture<ChargementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChargementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
