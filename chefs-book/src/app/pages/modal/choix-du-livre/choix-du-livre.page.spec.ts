import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoixDuLivrePage } from './choix-du-livre.page';

describe('ChoixDuLivrePage', () => {
  let component: ChoixDuLivrePage;
  let fixture: ComponentFixture<ChoixDuLivrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixDuLivrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoixDuLivrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
