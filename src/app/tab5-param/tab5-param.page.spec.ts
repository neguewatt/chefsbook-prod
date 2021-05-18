import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab5ParamPage } from './tab5-param.page';

describe('Tab5Page', () => {
  let component: Tab5ParamPage;
  let fixture: ComponentFixture<Tab5ParamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab5ParamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab5ParamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
