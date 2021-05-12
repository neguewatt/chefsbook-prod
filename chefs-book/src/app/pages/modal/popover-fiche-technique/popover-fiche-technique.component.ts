import { FicheTechniques } from 'src/app/models/ficheTechniques';
import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, ModalController, AlertController } from '@ionic/angular';
import { PartagerModalPage } from '../partager-modal/partager-modal.page';
import { NavigationExtras, Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { FichePage } from 'src/app/tab5-param/reglages/fiche/fiche.page';

@Component({
  selector: 'app-popover-fiche-technique',
  templateUrl: './popover-fiche-technique.component.html',
  styleUrls: ['./popover-fiche-technique.component.scss'],
})
export class PopoverFicheTechniqueComponent implements OnInit {

  fiche: any;
  dataReturned: any;
  ficheUpdate = true;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private route: Router,
    public modalController: ModalController,
    private dataService: AuthFirebaseService,
    private alertController: AlertController,
    private pageFiche: FichePage) {

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
  supprimer(){
    console.log(this.fiche);
   this.presentAlertConfirm();
  //  this.dataService.deleteFiche(this.fiche);
    this.popoverController.dismiss();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention ! ',
      message: 'Suppression de la fiche <strong>'+this.fiche.nom+'</strong>!!!',
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
            this.pageFiche.ngOnInit();
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
