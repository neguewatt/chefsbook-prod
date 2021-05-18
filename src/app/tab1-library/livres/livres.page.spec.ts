import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivresPage } from './livres.page';

describe('LivresPage', () => {
  let component: LivresPage;
  let fixture: ComponentFixture<LivresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
