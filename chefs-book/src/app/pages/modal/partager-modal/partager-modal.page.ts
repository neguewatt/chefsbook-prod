import { FicheTechniques } from 'src/app/models/ficheTechniques';
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
    console.log(this.fiche);
    this.modalTitle = this.navParams.data.paramTitle;
    
  }

  async closeModal() {
    const onClosedData = 'close';
    await this.modalController.dismiss(onClosedData);
  }

  async partageFiche() {
    const onClosedData = 'close';
    await this.modalController.dismiss(onClosedData);
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
      console.log(res[0]);

      if (res[0]){
        this.userId = res[0].idUtilisateur;
        console.log('id by email : ', this.userId);
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
    console.log(this.newMessage);

    if (this.newMessage === undefined){
      this.newMessage = 'vide';
    }
    this.dataService.updateFicheIdPartage(this.fiche, this.userId, this.newMessage);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Le partage de fiche a fonctionné !',
      duration: 2500
    });
    toast.present();
  }



}
