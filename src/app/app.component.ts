import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { FcmService } from './service/fcm.service';
import { PushNotificationSchema, PushNotifications,
  Token, ActionPerformed, } from '@capacitor/push-notifications';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fcmService: FcmService) {
    this.initializeApp();
  }

  initializeApp() {
    firebase.default.initializeApp(environment.firebaseConfig);
    this.checkDarkTheme();
    this.fcmService.initPush();
  }

  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      document.body.classList.toggle('dark');
    }

  }
}
