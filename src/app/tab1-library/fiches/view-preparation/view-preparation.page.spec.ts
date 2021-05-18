import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPreparationPage } from './view-preparation.page';

describe('ViewPreparationPage', () => {
  let component: ViewPreparationPage;
  let fixture: ComponentFixture<ViewPreparationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPreparationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPreparationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
