import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrepaPage } from './prepa.page';

describe('PrepaPage', () => {
  let component: PrepaPage;
  let fixture: ComponentFixture<PrepaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrepaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
