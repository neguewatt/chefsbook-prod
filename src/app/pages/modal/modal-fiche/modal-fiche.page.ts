import { Tab3SearchPage } from './../../../tab3-search/tab3-search.page';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavParams, PopoverController, ModalController, AlertController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController,
    private alertController: AlertController) {

  }

  ngOnInit() {
    //Get data from popover page
    this.fiche = this.navParams.get('fiche');
   //  console.log(this.fiche);
  }

  modifier() {
    if(this.fiche.type === 'Plat'){
      const navigationExtras: NavigationExtras = {
        state: {
          value: this.fiche,
          update: this.ficheUpdate
      }
    };
    this.route.navigate(['view-plat'], navigationExtras);
   }else{
    const navigationExtras: NavigationExtras = {
      state: {
        value: this.fiche,
        update: this.ficheUpdate
      }
    };
    this.route.navigate(['view-preparation'], navigationExtras);
   }
   this.popoverController.dismiss('modifier');
  }
  partager() {
    console.log(this.dataService.utilisateur.partage);
    if(this.dataService.utilisateur.partage < this.dataService.limitePartage){
      this.openModalPartager();
      this.popoverController.dismiss('partager');
    }else{
      this.erreurFinPArtage();
      this.popoverController.dismiss('partager');
    }
  }
  supprimer() {
   //  console.log(this.fiche);
    this.supprAlertConfirm();
  }
  async supprAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class textClass',
      header: '',
      message: 'Vous êtes sur le point de supprimer la fiche <strong>' + this.fiche.nom + '</strong>.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           //  console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
           //  console.log('Confirm Okay');
            this.popoverController.dismiss('Suppression');
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
      console.log(dataReturned);
      if (dataReturned.data !== 'close') {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();

  }
  async erreurFinPArtage() {
    const toast = await this.toastController.create({
      message: 'Vous avez atteint votre nombre maximum de partage mensuel.',
      duration: 3000
    });
    toast.present();
  }

}

