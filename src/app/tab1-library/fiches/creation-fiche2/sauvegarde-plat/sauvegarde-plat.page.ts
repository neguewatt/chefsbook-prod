
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { Plats } from 'src/app/models/plats';
import { ModalController, ToastController } from '@ionic/angular';
import { ChoixDuLivrePage } from 'src/app/pages/modal/choix-du-livre/choix-du-livre.page';

@Component({
  selector: 'app-sauvegarde-plat',
  templateUrl: './sauvegarde-plat.page.html',
  styleUrls: ['./sauvegarde-plat.page.scss'],
  styles: [`
  .even { background-color: #F2F2F2; }
  .odd { background-color: #FFFFFF; }
  `],
})
export class SauvegardePlatPage implements OnInit {

  plat: Plats;
  userNom: string;
  prenom: string;
  denreesDisabled = false;
  chevronDenreesOn = 'chevron-down-outline';
  tableau1 = false;
  tableau2 = false;
  today: Date;
  date: string;
  newPlatDenrees = [];

  constructor(private dataService: AuthFirebaseService,
    public modalController: ModalController,
    private toastController: ToastController,
    private activRoute: ActivatedRoute,
    private route: Router) {

    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation() !== null) {
       //  console.log('queryparam ', this.route.getCurrentNavigation().extras.state);
        this.plat = this.route.getCurrentNavigation().extras.state.value; // arrive de creation-fiche2 [plat]
      }
    });
  }


  ngOnInit() {
   //  console.log(this.plat);
  //  this.getUtilisateur();
  //  this.getOrdreTableau();
    this.userNom = this.dataService.utilisateur.nom;
    this.prenom = this.dataService.utilisateur.prenom;
    this.tableau1 = this.dataService.tableau1;
    this.tableau2 = this.dataService.tableau2;
    this.today = new Date();
    this.date = this.today.toLocaleDateString('fr-FR');

    this.newPlatDenrees = this.plat.denrees.reduce((r, a) => {
      // a.toggle=false;
      r[a.typeProduit] = r[a.typeProduit] || [];
      r[a.typeProduit].push(a);
      return r;
    }, Object.create(null));
  }


  // getUtilisateur() {
  //   let array = [];
  //   this.dataService.getUtilisateur().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(res => {
  //     array = res;
  //     this.userNom = array[0].nom;
  //     this.prenom = array[0].prenom;
  //   });
  // }

  // getOrdreTableau(){
  //   this.dataService.getOrdreTableauFT().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(res => {
  //     if(res[0].natureUniteQuantite){
  //       this.tableau1 = false;
  //       this.tableau2 = true;
  //     }else{
  //       this.tableau1 = true;
  //       this.tableau2 = false;
  //     }
  //    //  console.log('getOrdreTableau', res[0].natureUniteQuantite);
  //   });
  // }


  showDenrees(){
    if (this.denreesDisabled === true) {
      this.denreesDisabled = false;
      this.chevronDenreesOn = 'chevron-down-outline';
    } else {
      this.denreesDisabled = true;
      this.chevronDenreesOn = 'chevron-forward-outline';
    }
  }

  async savePlat() {
    const modal = await this.modalController.create({
      component: ChoixDuLivrePage,
      cssClass: 'choix-du-livre-modal-css'
    });

    modal.onDidDismiss().then((res) => {
      if (res !== null) {
        this.plat.livre = res.data.nom;
        this.ajoutFiche();
        this.route.navigate(['tabs']);
      }
    });
    return await modal.present();
  }

  async ajoutFiche() {
    this.dataService.addPlat(this.plat);
    const toast = await this.toastController.create({
      message: 'La fiche technique plat ' + this.plat.nom + ' vient d\'être ajouter dans le livre ' + this.plat.livre + '.',
      duration: 2000
    });
    toast.present();
  }

}
