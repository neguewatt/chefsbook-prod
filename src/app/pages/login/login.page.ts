import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthLoginService } from './../../service/auth-login.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthLoginService,
    private router: Router) { }

  ngOnInit() {
    this.initSigninForm();
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
          console.log(uid);
          this.router.navigate(['chargement']);
        }
      }
    ).catch(
      (error) => {
        this.errorLogin = error;
        console.log(error);
      }
    );
  }
}
