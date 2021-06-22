import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class SaveConnectionService {

  constructor(
    private authenticationService: AuthLoginService,
    private nativeStorage: NativeStorage,
    private router: Router) { }

    init(){
      console.log('serviceConnection');
      try {
        this.nativeStorage.getItem('loginMdp').then(
          data => {
            if(data.save){
              this.authenticationService.signInUser(data.email, data.password).then(
                (uid) => {
                  if(uid){
                   //  console.log(uid);
                    this.router.navigate(['chargement']);
                  }
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }



}
