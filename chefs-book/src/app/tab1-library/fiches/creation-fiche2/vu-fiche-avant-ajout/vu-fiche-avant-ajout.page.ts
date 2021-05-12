import { Denrees } from '../../../../models/denrees';
import { Plats } from '../../../../models/plats';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FicheTechniques } from 'src/app/models/ficheTechniques';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FichePlat } from 'src/app/models/fichePlat';
import { IngredientRefModalPage } from 'src/app/pages/modal/ingredient-ref-modal/ingredient-ref-modal.page';

@Component({
  selector: 'app-vu-fiche-avant-ajout',
  templateUrl: './vu-fiche-avant-ajout.page.html',
  styleUrls: ['./vu-fiche-avant-ajout.page.scss'],
})
export class VuFicheAvantAjoutPage implements OnInit {

  
  dataReturned: any;
  fiche: FicheTechniques;
  plat: Plats;
  // fichePlat: FichePlat;
  arrayDenrees: Denrees[] = []
  userNom: string;
  prenom: string;
  denrees: Denrees[] = [];
  arrayFichePlat: FicheTechniques[] = [];
  denreesDisabled = false;
  chevronDenreesOn = "chevron-down-outline";
  tableau1: boolean = true;
  tableau2: boolean = true;
  ingredientRef: string;
  date: string;

  constructor(private dataService: AuthFirebaseService, private activRoute: ActivatedRoute, private route: Router, public modalController: ModalController) {
    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        this.fiche = this.route.getCurrentNavigation().extras.state.value;
        this.arrayDenrees = this.route.getCurrentNavigation().extras.state.value1;
        //this.fichePlat = this.route.getCurrentNavigation().extras.state.value2;
        this.arrayFichePlat = this.route.getCurrentNavigation().extras.state.value3;
        this.plat = this.route.getCurrentNavigation().extras.state.value4;
      }
    });
  }

  ngOnInit() {
    console.log(this.arrayFichePlat);
    this.denrees = this.fiche.denrees;
    let _date = new Date(this.fiche.date.seconds * 1000);
    this.date = _date.toLocaleDateString();
    this.userNom = this.dataService.utilisateur.nom;
    this.prenom = this.dataService.utilisateur.prenom;
  //  this.getUtilisateur();
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
  //     console.log('getOrdreTableau');
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

  showDenrees(showDenrees: string) {
    if (this.denreesDisabled == true) {
      this.denreesDisabled = false;
      this.chevronDenreesOn = "chevron-down-outline";
    } else {
      this.denreesDisabled = true;
      this.chevronDenreesOn = "chevron-forward-outline";
    }
  }

  ajouterFiche() {
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: IngredientRefModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        value: this.fiche,
        value1: this.arrayDenrees,
       // value2: this.fichePlat,
        value3: this.arrayFichePlat,
        value4: this.plat,
        paramTitle: "Ingredient de référence"
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
