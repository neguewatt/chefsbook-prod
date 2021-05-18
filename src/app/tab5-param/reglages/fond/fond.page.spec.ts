import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FondPage } from './fond.page';

describe('FondPage', () => {
  let component: FondPage;
  let fixture: ComponentFixture<FondPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FondPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
