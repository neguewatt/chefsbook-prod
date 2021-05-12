import { AuthLoginService } from './../../service/auth-login.service';
import { by } from 'protractor';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginPageModule } from './login.module';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { Router } from '@angular/router';

class MockLogin {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loginUSer() {
    return true;
  };
}


describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;
  let formService: MockLogin;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule],
      // providers:[
      //   {useClass: MockLogin}
      // ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginPage);
      component = fixture.componentInstance;
      // formService = TestBed.get(MockLogin);
      // fixture.detectChanges();
    });

  }));


  it('creation de la page', async(() => {
    fixture = TestBed.createComponent(LoginPage);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('Message de bienvenu', () => {
    fixture = TestBed.createComponent(LoginPage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ion-text').textContent).toContain('Bienvenu');
  });

  it('Click sur bouton creation du compte', async(() => {
    spyOn(component, 'creerUtilisateur');
    const button = fixture.debugElement.nativeElement.querySelector('#creer-compte');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.creerUtilisateur).toHaveBeenCalled();
    });

  }));

  // it('Click sur bouton submit', async(() => {
  //   let insertSpy = spyOn(formService, 'loginUSer').and.callThrough();
  //   let formValidSpy = spyOnProperty(formService.form, 'valid', 'get').and.returnValue(true);
  //   component.onSubmitSigninForm();
  //   expect(insertSpy).toHaveBeenCalled();
  // }));



});

