import { environment } from './../../../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';

import { CreerUtilisateurPage } from './creer-compte.page';
import { AuthLoginService } from 'src/app/service/auth-login.service';

describe('CreerUtilisateurPage', () => {
  let component: CreerUtilisateurPage;
  let fixture: ComponentFixture<CreerUtilisateurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreerUtilisateurPage],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreerUtilisateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));




});
