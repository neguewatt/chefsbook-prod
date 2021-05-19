import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Denrees } from 'src/app/models/denrees';
import { Preparation } from 'src/app/models/preparation';
import { Plats } from 'src/app/models/plats';
import { PosteDeTravail } from 'src/app/models/postes';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { AjoutProduitPage } from 'src/app/pages/modal/ajout-produit/ajout-produit.page';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { CreationFiche2Page } from '../creation-fiche2.page';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.page.html',
  styleUrls: ['./plat.page.scss'],
})
export class PlatPage implements OnInit {

  // recherche fiche techniques
  ficheTechnique: Preparation ;
  ficheTechniques: Preparation[] = [];
  isItemAvailable = false;
  items = [];

  // creation du plat
  plat: Plats;
  fiche: Preparation ;
  fichePreparation: Preparation[];
  arrayDenrees: Denrees[] = [];
  ajoutPrepa = false;
  utilisateur: Utilisateurs;
  userNom: string;
  prenom: string;
  denrees: Denrees[];

  // affichage denrees
  denreesDisabled = true;
  hide = true;
  presenceFichePlat = true;
  chevronDenreesOn = 'chevron-down-outline';
  chevronficheOn = 'chevron-down-outline';
  tableau1 = true;
  tableau2 = true;

  newTitre: string;
  postes: PosteDeTravail[] = [];
  newPoste: string;
  types: string[] = ['Préparation', 'Plat'];
  prepa = true;
  newType: string;
  newProduitRef: Denrees;
  newDescriptionCommercial: string;
  newDescriptionTechnique: string;
  today: Date;
  date: string;
  newPortion: string;

  constructor(private dataService: AuthFirebaseService,
    private toastController: ToastController,
    public modalController: ModalController,
    private activRoute: ActivatedRoute,
    private route: Router,
    public creationFiche2Page: CreationFiche2Page) {
    // retour de la vu fiche avant ajout page
    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation() !== null) {
        this.ajoutPrepa = true;
        this.fiche = this.route.getCurrentNavigation().extras.state.value; // arrive de creation-fiches
        this.arrayDenrees = this.route.getCurrentNavigation().extras.state.value1;
        this.plat = this.route.getCurrentNavigation().extras.state.value4;
        if (this.arrayDenrees ===  undefined) {
          this.denreesDisabled = false;
        } else {
          this.denreesDisabled = true;
        }
        if (this.plat.fichePreparation ===  undefined) {
          this.presenceFichePlat = false;
        } else {
          this.presenceFichePlat = true;
        }
      }
    });
  }

  ngOnInit() {
    if (this.plat ===  undefined) {
      this.plat = new Plats();
    }
    if (this.dataService.partagePrepaListe) {
      this.dataService.partagePrepaListe.forEach(partagePrepa => {
        this.ficheTechniques.push(partagePrepa);
      });
      console.log(this.ficheTechniques);
    }

    this.ficheTechniques.sort((a, b) => {
      if (a.nom < b.nom) {
        return -1;
      }
      if (a.nom > b.nom) {
        return 1;
      }
      return 0;
    });
    this.userNom = this.dataService.utilisateur.nom;
    this.prenom = this.dataService.utilisateur.prenom;
    this.ficheTechniques = this.dataService.preparationListe;
    this.tableau1 = this.dataService.tableau1;
    this.tableau2 = this.dataService.tableau2;
    this.postes = this.dataService.posteDeTravailListe;
    this.today = new Date();
    this.date = this.today.toLocaleDateString('fr-FR');
    console.log(this.postes);
  }

  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.ficheTechniques = this.ficheTechniques.filter((fiche) => {
        const retour = (fiche.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return retour;
      });
      this.isItemAvailable = true;
    } else {
      this.isItemAvailable = false;
      this.ficheTechniques = this.dataService.preparationListe;
      console.log('retour efface recherche',this.ficheTechniques);

      // if (this.dataService.partagePrepaListe) {
      //   this.dataService.partagePrepaListe.forEach(partagePrepa => {
      //     this.ficheTechniques.push(partagePrepa);
      //   });
      //   console.log(this.ficheTechniques);
      // }
    }
  }

  showDenrees() {
    if (this.denreesDisabled) {
      this.denreesDisabled = false;
      this.chevronDenreesOn = 'chevron-down-outline';
    } else {
      this.denreesDisabled = true;
      this.chevronDenreesOn = 'chevron-forward-outline';
    }
  }



  addFiche(fiche: Preparation) {
    const navigationExtras: NavigationExtras = {
      state: {
        value: fiche,
        value1: this.arrayDenrees,
        value4: this.plat
      }
    };
    this.route.navigate(['creation-fiche2/plat/vu-fiche-avant-ajout/'], navigationExtras);
  }


  // supprimer plus tard
  async addProduit() {
    const modal = await this.modalController.create({
      component: AjoutProduitPage,
      cssClass: 'addProduit-custom-modal-css'
    });

    modal.onDidDismiss().then((newDenree) => {
      console.log(newDenree.data);
      if (newDenree.data !== null) {
        this.denrees.push(newDenree.data);

      }
    });
    return await modal.present();
  }

  // supprimer plus tard
  deleteProduit(denree: Denrees) {
    // this.suppressionDenree(denree);
    // const index: number = this.denrees.indexOf(denree);
    // if (index !== -1) {
    //   this.denrees.splice(index, 1);
    // }
    // if (denree.produit === this.newProduitRef.produit) {
    //   this.newProduitRef = null;
    // }

  }


  addNewFiche() {
    this.newTitre = this.creationFiche2Page.newTitre;
    this.newType = this.creationFiche2Page.newType;
    console.log(this.newTitre, this.newPortion, this.newPoste, this.newDescriptionCommercial, this.plat.fichePreparation);

    if (this.newTitre === null || this.newDescriptionCommercial === null || this.newDescriptionTechnique === null ||
      this.newPoste === null || this.newPortion === null || this.plat.fichePreparation === null) {
      this.erreurCreationFiche();
    } else {
      if (this.newType === 'Plat') {
        this.denrees = this.plat.denrees.map((denree) => {
          const retour = Object.assign({}, denree);
          return retour;
        });
        this.fichePreparation = this.plat.fichePreparation.map((fiche) => {
          const retour = Object.assign({}, fiche);
          return retour;
        });
        const newPlat = new Plats();
        newPlat.type = this.newType;
        newPlat.nom = this.newTitre.charAt(0).toUpperCase() + this.newTitre.substr(1);
        newPlat.date = this.today;
        newPlat.denrees = this.denrees;
        newPlat.fichePreparation = this.fichePreparation;
        newPlat.descriptionCommercial = this.newDescriptionCommercial.charAt(0).toUpperCase() + this.newDescriptionCommercial.substr(1);
        newPlat.descriptionTechnique = this.newDescriptionTechnique.charAt(0).toUpperCase() + this.newDescriptionTechnique.substr(1);
        newPlat.poste = this.newPoste;
        newPlat.portion = this.newPortion;
        newPlat.idUtilisateur = this.dataService.user.uid;
        newPlat.livre = this.plat.livre;
        this.plat = newPlat;

        console.log(this.plat);
        const navigationExtras: NavigationExtras = {
          state: {
            value: this.plat
          }
        };
        this.route.navigate(['sauvegarde-plat/'], navigationExtras);

      } else {

      }
    }
  }


  //////////////////////////////////////////////////
  ///////Gestion des erreurs de l'utilisateur///////
  //////////////////////////////////////////////////

  refSelect() {
    if (this.denrees.length === 0) {
      this.erreurPasDeDenrees();
    }
  }

  async erreurCreationFiche() {
    const toast = await this.toastController.create({
      message: 'Merci de bien vouiloir remplir la fiche entierement !',
      duration: 2000
    });
    toast.present();
  }
  async suppressionDenree(denree: Denrees) {
    const toast = await this.toastController.create({
      message: 'Le produit ' + denree.produit + ' vient d\'être retiré du tableau.',
      duration: 2000
    });
    toast.present();
  }

  async erreurPasDeDenrees() {
    const toast = await this.toastController.create({
      message: 'Veuillez ajouter des denrées pour choisir votre aliment de référence.',
      duration: 3000
    });
    toast.present();
  }
}
