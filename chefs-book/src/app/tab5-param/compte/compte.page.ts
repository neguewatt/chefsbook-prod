import { Utilisateurs } from './../../models/Utilisateurs';
import { Component, OnInit, Input } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  @Input() titre: string;

  nom: string;
  prenom: string;
  email: string;
  abonnement: string;
  emailFillo: string;
  boolButton = false;

  constructor(private dataService: AuthFirebaseService,
    private alertController: AlertController) {
    this.titre = 'Compte';
   }

  ngOnInit() {
    this.nom = this.dataService.utilisateur.nom;
    this.prenom = this.dataService.utilisateur.prenom;
    this.email = this.dataService.utilisateur.email;
    this.abonnement = this.dataService.utilisateur.abonnement;

    if(this.abonnement){
      if(this.dataService.utilisateur.abonnement === 'G'){
        this.abonnement = 'Gratuite';
      }else{
        this.abonnement = 'Payante';
      }
    }
  }

  getItems(ev: any){
    const val = (ev.target as HTMLInputElement).value;
    if (val && val.trim() !== '') {
      this.boolButton = true;
    }else{
      this.boolButton = false;
    }
  }

  deleteUser(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention ! ',
      message: 'Êtes vous sur de bien vouloir <strong> nous quitter </strong> ?',
      buttons: [
        {
          text: 'Noooo',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.dataService.deleteUser(this.dataService.user.uid);
          }
        }
      ]
    });
    await alert.present();
  }


}
