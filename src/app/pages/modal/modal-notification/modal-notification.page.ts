import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { NotificationFiche } from 'src/app/models/notification';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.page.html',
  styleUrls: ['./modal-notification.page.scss'],
})
export class ModalNotificationPage implements OnInit {

  notification: NotificationFiche;

  constructor(private modalController: ModalController,
              private toastController: ToastController,
              private navParams: NavParams,
              private dataService: AuthFirebaseService) { }

  ngOnInit() {
    this.notification = this.navParams.get('notif');
    console.log(this.notification);
  }

  supprimer(){
    this.modalController.dismiss('Suppression');
    this.erreurFinPArtage();
    this.dataService.deleteNotif(this.notification);
  }
  async erreurFinPArtage() {
    const toast = await this.toastController.create({
      message: 'Notification supprimée.',
      duration: 2000
    });
    toast.present();
  }

}
