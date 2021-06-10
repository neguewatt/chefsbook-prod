import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  constructor() { }

  signInUser(email: string, password: string) {
   //  console.log(email, password);
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data.user.uid);
           //  console.log('Connecté', data.user.uid);
          },
          (error) => {
           //  console.log('error1', error);
            reject(error);
          }
        );
      }
    );
  }


  signOutUser() {
    firebase.default.auth().signOut();
   //  console.log('déconnecté');
  }
}
