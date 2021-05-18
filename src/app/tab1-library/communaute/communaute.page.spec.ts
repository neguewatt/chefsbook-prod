import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommunautePage } from './communaute.page';

describe('CommunautePage', () => {
  let component: CommunautePage;
  let fixture: ComponentFixture<CommunautePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunautePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommunautePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
