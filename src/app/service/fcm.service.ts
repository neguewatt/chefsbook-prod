import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotificationSchema, Token, ActionPerformed, PushNotifications } from '@capacitor/push-notifications';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class FcmService {
    remoteToken: string;

    constructor(private router: Router) { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
      console.log('test push');
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive) {
        PushNotifications.register();
      } else {
          console.log('pas de permission pour le push');
      }
    });
    PushNotifications.addListener(
      'registration',
      (token: Token) => {
          console.log('My token: ' + JSON.stringify(token));
          console.log('token26', token);
      }
    );
    PushNotifications.addListener('registrationError', (error: any) => {
        console.log('Error: ' + JSON.stringify(error));
    });
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigateByUrl(``);
        }
      }
    );
  }
}
