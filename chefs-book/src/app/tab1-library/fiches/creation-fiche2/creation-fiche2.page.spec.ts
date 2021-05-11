import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreationFiche2Page } from './creation-fiche2.page';

describe('CreationFiche2Page', () => {
  let component: CreationFiche2Page;
  let fixture: ComponentFixture<CreationFiche2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationFiche2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreationFiche2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
