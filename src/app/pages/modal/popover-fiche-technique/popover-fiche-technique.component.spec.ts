import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverFicheTechniqueComponent } from './popover-fiche-technique.component';

describe('PopoverFicheTechniqueComponent', () => {
  let component: PopoverFicheTechniqueComponent;
  let fixture: ComponentFixture<PopoverFicheTechniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverFicheTechniqueComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverFicheTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
