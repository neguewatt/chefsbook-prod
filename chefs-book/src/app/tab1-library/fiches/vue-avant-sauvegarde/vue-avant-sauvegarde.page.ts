
import { Livres } from '../../../models/livres';
import { FicheTechniques } from 'src/app/models/ficheTechniques';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Denrees } from 'src/app/models/denrees';
import { ModalController, ToastController } from '@ionic/angular';
import { ChoixDuLivrePage } from 'src/app/pages/modal/choix-du-livre/choix-du-livre.page';

@Component({
  selector: 'app-vue-avant-sauvegarde',
  templateUrl: './vue-avant-sauvegarde.page.html',
  styleUrls: ['./vue-avant-sauvegarde.page.scss'],
})
export class VueAvantSauvegardePage implements OnInit {

  fiche: FicheTechniques;
  userNom: string;
  prenom: string;
  denrees: Denrees[] = [];
  denreesDisabled = false;
  chevronDenreesOn = "chevron-down-outline";
  tableau1 = true;
  tableau2 = true;

  livre: Livres;
  livres: Livres[];

  constructor(private dataService: AuthFirebaseService,
    private activRoute: ActivatedRoute,
    private toastController: ToastController,
    private route: Router,
    public modalController: ModalController) {
    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        this.fiche = this.route.getCurrentNavigation().extras.state.value;
        console.log(this.fiche);
      }
    });
  }


  ngOnInit() {
    this.denrees = this.fiche.denrees;
    //  this.getUtilisateur();
    this.userNom = this.dataService.utilisateur.nom;
    this.prenom = this.dataService.utilisateur.prenom;
    //  this.getOrdreTableau();
    this.tableau1 = this.dataService.tableau1;
    this.tableau2 = this.dataService.tableau2;
  }

  // getOrdreTableau() {
  //   this.dataService.getOrdreTableauFT().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(res => {
  //     if (res[0].natureUniteQuantite) {
  //       this.tableau1 = false;
  //       this.tableau2 = true;
  //     } else {
  //       this.tableau1 = true;
  //       this.tableau2 = false;
  //     }
  //     console.log('getOrdreTableau', res[0].natureUniteQuantite);
  //   });
  // }
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

  showDenrees() {
    if (this.denreesDisabled == true) {
      this.denreesDisabled = false;
      this.chevronDenreesOn = "chevron-down-outline";
    } else {
      this.denreesDisabled = true;
      this.chevronDenreesOn = "chevron-forward-outline";
    }
  }
  async openModalLivre() {
    const modal = await this.modalController.create({
      component: ChoixDuLivrePage,
      cssClass: 'choix-du-livre-modal-css'
    });
    modal.onDidDismiss().then((res) => {
      if (res !== null) {
        this.livre = res.data;
        this.fiche.livre = this.livre.nom;

        this.ajoutFiche();
        this.route.navigate(['tabs']);
      }
    });
    return await modal.present();
  }
  async ajoutFiche() {
    this.dataService.addFicheTechnique(this.fiche);
    const toast = await this.toastController.create({
      message: 'La fiche technique ' + this.fiche.nom + ' vient d\'être ajouter dans le livre ' + this.fiche.livre + '.',
      duration: 2000
    });
    toast.present();
  }
}
