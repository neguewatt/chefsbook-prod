import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartagerModalPage } from './partager-modal.page';

describe('PartagerModalPage', () => {
  let component: PartagerModalPage;
  let fixture: ComponentFixture<PartagerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartagerModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartagerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
