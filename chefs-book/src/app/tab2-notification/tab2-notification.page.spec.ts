import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab2NotificationPage } from './tab2-notification.page';

describe('Tab2Page', () => {
  let component: Tab2NotificationPage;
  let fixture: ComponentFixture<Tab2NotificationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2NotificationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2NotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
