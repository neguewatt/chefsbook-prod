import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPlatPage } from './view-plat.page';

describe('ViewPlatPage', () => {
  let component: ViewPlatPage;
  let fixture: ComponentFixture<ViewPlatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPlatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
