import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavParams, PopoverController, ModalController, AlertController } from '@ionic/angular';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { PartagerModalPage } from '../partager-modal/partager-modal.page';
import { FichesPage } from './../../../tab1-library/fiches/fiches.page';

@Component({
  selector: 'app-modal-fiche',
  templateUrl: './modal-fiche.page.html',
  styleUrls: ['./modal-fiche.page.scss'],
})
export class ModalFichePage implements OnInit {

  fiche: any;
  dataReturned: any;
  ficheUpdate = true;
  fichePage: FichesPage;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private route: Router,
    public modalController: ModalController,
    private dataService: AuthFirebaseService,
    private alertController: AlertController) {

  }

  ngOnInit() {
    //Get data from popover page
    this.fiche = this.navParams.get('fiche');
    console.log(this.fiche);
  }

  modifier() {
    console.log('modifier : ' + this.fiche);
    const navigationExtras: NavigationExtras = {
      state: {
        value: this.fiche,
        update: this.ficheUpdate
      }
    };
    this.route.navigate(['view-preparation'], navigationExtras);
    this.popoverController.dismiss();
  }
  partager() {
    console.log('partager : ' + this.fiche);
    this.openModalPartager();
    this.popoverController.dismiss();
  }
  supprimer() {
    console.log(this.fiche);
    this.presentAlertConfirm();
    this.popoverController.dismiss();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention ! ',
      message: 'Suppression de la fiche <strong>' + this.fiche.nom + '</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.dataService.deleteFiche(this.fiche);
          }
        }
      ]
    });
    await alert.present();
  }

  async openModalPartager() {
    const modal = await this.modalController.create({
      component: PartagerModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        fiche: this.fiche,
        paramTitle: 'Partager votre fiche'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();

  }



}

