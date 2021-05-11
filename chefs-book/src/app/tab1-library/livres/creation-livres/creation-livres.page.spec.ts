import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreationLivresPage } from './creation-livres.page';

describe('CreationLivresPage', () => {
  let component: CreationLivresPage;
  let fixture: ComponentFixture<CreationLivresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationLivresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreationLivresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
