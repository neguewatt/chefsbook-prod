import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngredientRefModalPage } from './ingredient-ref-modal.page';

describe('IngredientRefModalPage', () => {
  let component: IngredientRefModalPage;
  let fixture: ComponentFixture<IngredientRefModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientRefModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientRefModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
