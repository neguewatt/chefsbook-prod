import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthLoginService } from './../../service/auth-login.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  showPassword = false;
  errorLogin = '';
  colorA = 'color: red;  --ion-item-border-color: red;';
  colorB = '';
  checked: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthLoginService,
    private nativeStorage: NativeStorage,
    private router: Router) { }

  ngOnInit() {
    this.initSigninForm();
    this.checked = true;
    this.getLoginmdp();
  }

  creerUtilisateur(){
    this.router.navigate(['creer-compte']);
  }

  initSigninForm() {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }


  onSubmitSigninForm() {
    this.errorLogin = '';
    const email = this.loginform.get('email').value;
    const password = this.loginform.get('password').value;
    this.authenticationService.signInUser(email, password).then(
      (uid) => {
        if(uid){
         //  console.log(uid);
          this.saveloginmdp();
          this.router.navigate(['chargement']);
        }
      }
    ).catch(
      (error) => {
        this.errorLogin = error;
       //  console.log(error);
      }
    );
  }

  onChecked(){
    this.checked = !this.checked;
  }

  saveloginmdp(){
    if(this.checked){
      this.nativeStorage.setItem('loginMdp', {save: this.checked, login: this.loginform.get('email').value, password: this.loginform.get('password').value})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    }else{
      this.nativeStorage.setItem('loginMdp', {save: this.checked, login: '', password: ''})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    }
  }

  getLoginmdp(){
    try {
      this.nativeStorage.getItem('loginMdp')
      .then(
        data => {
          this.loginform.setValue({email: data.login, password: data.password})
        }
      );
    } catch (error) {
      console.log(error);
    }
  }



}
