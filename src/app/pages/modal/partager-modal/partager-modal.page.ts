import { Preparation } from 'src/app/models/preparation';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-partager-modal',
  templateUrl: './partager-modal.page.html',
  styleUrls: ['./partager-modal.page.scss'],
})
export class PartagerModalPage implements OnInit {

  modalTitle: string;
  fiche: any;
  email: string;
  newMessage: string;
  userId: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public alertController: AlertController,
    private dataService: AuthFirebaseService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.fiche = this.navParams.data.fiche;
   //  console.log(this.fiche);
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    await this.modalController.dismiss('close');
  }

  async partageFiche() {
    await this.modalController.dismiss('close');
    this.getUtilisateurByEmail();
  }

  getUtilisateurByEmail(){
    this.dataService.getUtilisateurByEmail(this.email).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      if (res[0]){
        this.userId = res[0].idUtilisateur;
        this.updateFicheIdPartage();

      }else{
        this.presentAlert();
      }



    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'Nous ne pouvons partager la fiche technique car votre correspondant n\'est pas client de l\'application.',
      buttons: ['OK']
    });

    await alert.present();
  }

  updateFicheIdPartage(){
    if (this.newMessage ===  undefined){
      this.newMessage = 'vide';
    }
    this.dataService.updateFicheIdPartage(this.fiche, this.userId, this.newMessage);
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Le partage de fiche a fonctionn?? !',
      duration: 2500
    });
    toast.present();
  }



}
