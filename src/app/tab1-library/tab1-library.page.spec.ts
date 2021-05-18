import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { Tab1LibraryPage } from './tab1-library.page';

describe('TabLibraryPage', () => {
  let component: Tab1LibraryPage;
  let fixture: ComponentFixture<Tab1LibraryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1LibraryPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1LibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should click fichesBoolean ', (() => {
  //   spyOn(component, 'segmentChanged');
  //   const button = fixture.debugElement.query(By.css('.ion-button')).nativeElement;
  //   button.click('fichesBoolean');

  // }));


});

