import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AuthLoginService } from './service/auth-login.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authenticationService: AuthLoginService,
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('source', this.platform);
      firebase.default.initializeApp(environment.firebaseConfig);
      if(this.platform.is('desktop')){
        this.afAuth.authState.subscribe(auth => {
        if (!auth) {
          console.log('non connecté');
          this.router.navigate(['login']);
        } else {
          console.log('connecté: ' + auth.uid);
          this.router.navigate(['chargement']);
        }
      });
      }else{
        this.nativeStorage.getItem('loginMdp').then(
          data => {
            if(data.save){
              this.afAuth.authState.subscribe(auth => {
                  console.log('connecté', auth.uid);
                  this.router.navigate(['chargement']);
              });
            }else{
              console.log('non connecté');
              this.router.navigate(['login']);
            }
          }
        );
      }




      //this.logAuto();
      // this.fcmService.initPush();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkDarkTheme();
    });
  }

  // logAuto(){
  //   console.log('serviceConnection');
  //   try {
  //     this.nativeStorage.getItem('loginMdp').then(
  //       data => {
  //         console.log(data);
  //         if(data.save){
  //           this.authenticationService.signInUser(data.email, data.password).then(
  //             (uid) => {
  //               if(uid){
  //                //  console.log(uid);
  //                 this.router.navigate(['chargement']);
  //               }
  //             }
  //           ).catch(
  //             (error) => {
  //               console.log(error);
  //             }
  //           );
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      document.body.classList.toggle('dark');
    }

  }
}
