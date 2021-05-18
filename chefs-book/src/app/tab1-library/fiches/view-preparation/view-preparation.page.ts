import { Utilisateurs } from './../../../models/Utilisateurs';
import { Denrees } from './../../../models/denrees';
import { Produits } from '../../../models/produits';
import { Preparation } from '../../../models/preparation';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Livres } from 'src/app/models/livres';
import { ModalController } from '@ionic/angular';
import { PartagerModalPage } from 'src/app/pages/modal/partager-modal/partager-modal.page';

@Component({
  selector: 'app-view-preparation',
  templateUrl: './view-preparation.page.html',
  styleUrls: ['./view-preparation.page.scss'],
})
export class ViewPreparationPage implements OnInit {


  dataReturned: any;
  ficheTechniquesAll: Preparation[] = [];
  fiche: Preparation ;
  keyFiche: any;
  dataDenrees: any[] = [];
  dataProduits: Produits[] = [];
  produits: Produits[] = [];
  utilisateur: Utilisateurs;
  userNom: string;
  prenom: string;

  // start variable fiche
  apportNutritionnel: string;
  coutParPortion: number;
  date: string;
  descriptionTechniques: string;
  denrees: Denrees[] = [];
  description: string;
  dressage: string;
  idUtilisateur: string[] = [];
  livre: Livres[] = [];
  nom: string;
  nombreDePortion: number;
  photo: string;
  poste: string;
  produitRef: string;
  type: string;
  // end variable fiche
  denreesDisabled = false;
  chevronDenreesOn = 'chevron-down-outline';
  tableau1 = true;
  tableau2 = true;

  ficheUpdate: boolean;
  showButtonUpdate = false;
  newNom: string;
  postes: string[] = ['Bar', 'Boulangerie', 'Cuisson poisson', 'Cuisson viande', 'Entremets', 'Garde manger', 'Patisserie', 'Saucier'];
  newPoste: string;
  newProduitRef: string;
  newDescriptionTechniques: string;

  newItems = {};




  constructor(private dataService: AuthFirebaseService,
              private activRoute: ActivatedRoute,
              private route: Router,
              public modalController: ModalController) {
    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        console.log('param ok ', this.route.getCurrentNavigation().extras.state);
        this.fiche = this.route.getCurrentNavigation().extras.state.value;
        if (this.route.getCurrentNavigation().extras.state.update){
          this.showUpdateFiche();
        }
      }
    });
  }

  ngOnInit() {
    this.getUtilisateurById();
  //  this.getOrdreTableau();
    this.tableau1 = this.dataService.tableau1;
    this.tableau2 = this.dataService.tableau2;
    this.nom = this.fiche.nom;

    console.log(this.fiche.date);
    const _date = new Date(this.fiche.date.seconds * 1000);
    this.date = _date.toLocaleDateString();
    this.descriptionTechniques = this.fiche.descriptionTechniques;
    this.description = this.fiche.description;
    this.produitRef = this.fiche.produitRef.produit;
    console.log('ref: ', this.produitRef);

    this.poste = this.fiche.poste;
    this.denrees = this.fiche.denrees;

    this.newItems = this.groupByType(this.denrees);
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
  //   });
  // }

  getFicheTechniqueById() {
    this.ficheTechniquesAll.forEach(resFiche => {
      if (resFiche.key ===  this.keyFiche) {
        this.fiche = resFiche;
      }
    });
  }

  getUtilisateurById() {
    this.dataService.getUtilisateurById(this.fiche.idUtilisateur).then((user: Utilisateurs) => {
      this.userNom = user.nom;
      this.prenom = user.prenom;
    });
  }



  showDenrees() {
    if (this.denreesDisabled ===  true) {
      this.denreesDisabled = false;
      this.chevronDenreesOn = 'chevron-down-outline';
    } else {
      this.denreesDisabled = true;
      this.chevronDenreesOn = 'chevron-forward-outline';
    }
  }
  async openModal() {
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
  showUpdateFiche() {
    this.showButtonUpdate = true;
    this.ficheUpdate = true;
  }
  groupByType(array: any){
    return array.reduce((r, a) => {
          r[a.typeProduit] = r[a.typeProduit] || [];
          r[a.typeProduit].push(a);
          return r;
      }, Object.create(null));
  }





}
