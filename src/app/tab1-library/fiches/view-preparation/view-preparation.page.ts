import { PosteDeTravail } from 'src/app/models/postes';
import { Utilisateurs } from './../../../models/Utilisateurs';
import { Denrees } from './../../../models/denrees';
import { Produits } from '../../../models/produits';
import { Preparation } from '../../../models/preparation';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Livres } from 'src/app/models/livres';
import { ModalController, ToastController } from '@ionic/angular';
import { PartagerModalPage } from 'src/app/pages/modal/partager-modal/partager-modal.page';
import { AjoutProduitPage } from 'src/app/pages/modal/ajout-produit/ajout-produit.page';
import { ChoixDuLivrePage } from 'src/app/pages/modal/choix-du-livre/choix-du-livre.page';

@Component({
  selector: 'app-view-preparation',
  templateUrl: './view-preparation.page.html',
  styleUrls: ['./view-preparation.page.scss'],
})
export class ViewPreparationPage implements OnInit {

  dataReturned: any;
  ficheTechniquesAll: Preparation[] = [];
  fiche: Preparation;
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
  livre: Livres;
  nom: string;
  nombreDePortion: number;
  photo: string;
  poste: string;
  produitRef: Denrees;
  type: string;
  // end variable fiche
  denreesDisabled = false;
  denreeToggle = false;
  chevronDenreesOn = 'chevron-down-outline';
  tableau1 = true;
  tableau2 = true;

  map: Denrees[];
  ficheUpdate = false;
  showButtonUpdate = false;
  newNom: string;
  postes: PosteDeTravail[] = [];
  newPoste: string;
  newProduitRef: Denrees;
  newDescriptionTechniques: string;

  newItems: Array<any> = [];
  ficheCopy: Preparation;

  constructor(private dataService: AuthFirebaseService,
    private activRoute: ActivatedRoute,
    private route: Router,
    private toastController: ToastController,
    public modalController: ModalController) {
    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        //  console.log('param ok ', this.route.getCurrentNavigation().extras.state);
        this.fiche = this.route.getCurrentNavigation().extras.state.value;
        this.fiche.key = this.route.getCurrentNavigation().extras.state.key;
        if (this.route.getCurrentNavigation().extras.state.update) {
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

    //  console.log(this.fiche.key);
    const _date = new Date(this.fiche.date.seconds * 1000);
    this.date = _date.toLocaleDateString();
    this.descriptionTechniques = this.fiche.descriptionTechniques;
    // this.description = this.fiche.description;
    this.produitRef = this.fiche.produitRef;
    //  console.log('ref: ', this.produitRef);

    this.postes = this.dataService.posteDeTravailListe;
    this.denrees = this.fiche.denrees;

    this.newItems = this.groupByType(this.denrees);
  }

  getFicheTechniqueById() {
    this.ficheTechniquesAll.forEach(resFiche => {
      if (resFiche.key === this.keyFiche) {
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
    if (this.denreesDisabled === true) {
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
    this.showButtonUpdate = !this.showButtonUpdate;
    this.ficheUpdate = !this.ficheUpdate;
    // console.log(this.poste);
    if (this.showButtonUpdate) {
      this.ficheCopy = this.fiche;
    } else {
      console.log('fiche', this.fiche);
    }
  }
  updateFiche() {
    this.ficheCopy.key = this.fiche.key;
    this.ficheCopy.nom = this.nom;
    const _date = new Date();
    this.ficheCopy.date = new Date(_date);
    if (this.poste !== undefined) {
      this.ficheCopy.poste = this.poste;
    } else {
      this.ficheCopy.poste = this.fiche.poste;
    }
    if (this.produitRef !== undefined) {
      this.ficheCopy.produitRef = this.produitRef;
    } else {
      this.ficheCopy.produitRef = this.fiche.produitRef;
    }
    this.ficheCopy.descriptionTechniques = this.descriptionTechniques;
    if (this.map !== undefined) {
      this.ficheCopy.denrees = this.map;
    } else {
      this.ficheCopy.denrees = this.fiche.denrees;
    }
    this.ficheCopy.idPartage = this.fiche.idPartage;
    this.ficheCopy.type = this.fiche.type;
    this.ficheCopy.livre = this.fiche.livre;
    console.log(this.ficheCopy);
    try {
      this.dataService.updateFichePrepa(this.ficheCopy.key, this.ficheCopy);
      this.route.navigate(['tabs']);
    } catch (error) {
      console.log(error);
    }
  }

  groupByType(array: any) {
    return array.reduce((r, a) => {
      r[a.typeProduit] = r[a.typeProduit] || [];
      r[a.typeProduit].push(a);
      return r;
    }, Object.create(null));
  }

  async addProduit() {
    const modal = await this.modalController.create({
      component: AjoutProduitPage,
      cssClass: 'addProduit-custom-modal-css'
    });
    modal.onDidDismiss().then(newDenree => {
      console.log(newDenree);

      if (newDenree.data !== undefined) {
        this.denrees.push(newDenree.data);
        console.log('newDenree', this.denrees);
        this.newItems = this.groupByType(this.denrees);
        this.map = this.denrees.map((denree) => {
          const retour = Object.assign({}, denree);
          return retour;
        });
      }
    });
    return await modal.present();
  }

  async updateProduit(denree: Denrees) {
    const index = this.denrees.indexOf(denree);
    console.log(index);

    const modal = await this.modalController.create({
      component: AjoutProduitPage,
      componentProps: { value: denree },
      cssClass: 'addProduit-custom-modal-css'
    });
    modal.onDidDismiss().then(newDenree => {
      if (newDenree.data !== undefined) {
        this.denrees[index] = newDenree.data;
        this.map = this.denrees.map((mapDenree) => {
          const retour = Object.assign({}, mapDenree);
          return retour;
        });
      }
    });
    return await modal.present();
  }
  deleteProduit(denree: Denrees) {
    this.suppressionDenree(denree);
    console.log(denree);

    const index: number = this.fiche.denrees.indexOf(denree);
    if (index !== -1) {
      this.fiche.denrees.splice(index, 1);
    }
    console.log(this.fiche.denrees);

    if (denree.produit === this.produitRef.produit) {
      this.produitRef = new Denrees();
    }
    console.log(this.fiche.denrees);
    this.newItems = this.groupByType(this.fiche.denrees);
  }
  choixLivre() {
    this.openModalLivre();
  }
  async openModalLivre() {
    const modal = await this.modalController.create({
      component: ChoixDuLivrePage,
      cssClass: 'choix-du-livre-modal-css'
    });
    modal.onDidDismiss().then((res) => {
      if (res !== null) {
        this.livre = res.data;
        this.ficheCopy.livre = this.livre.nom;

        // this.ajoutFiche();
        // this.route.navigate(['tabs']);
      }
    });
    return await modal.present();
  }
  async suppressionDenree(denree: Denrees) {
    const toast = await this.toastController.create({
      message: 'Le produit ' + denree.produit + ' vient d\'??tre retir?? du tableau.',
      duration: 2000
    });
    toast.present();
  }

}
