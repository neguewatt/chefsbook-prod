import { CreationFiche2Page } from '../creation-fiche2.page';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Denrees } from 'src/app/models/denrees';
import { Preparation } from 'src/app/models/preparation';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { AjoutProduitPage } from 'src/app/pages/modal/ajout-produit/ajout-produit.page';
import { PosteDeTravail } from 'src/app/models/postes';

@Component({
  selector: 'app-prepa',
  templateUrl: './prepa.page.html',
  styleUrls: ['./prepa.page.scss'],
})
export class PrepaPage implements OnInit {
  ficheTechnique: Preparation ;

  userNom: string;
  prenom: string;

  denrees: Denrees[] = [];
  // end variable fiche
  denreesDisabled = false;
  chevronDenreesOn = 'chevron-down-outline';
  tableau1 = true;
  tableau2 = true;

  newTitre: string;
  postes: PosteDeTravail[] = [];
  newPoste: string;
  types = ['Préparation', 'Plat'];
  prepa = true;
  newProduitRef: Denrees;
  newDescriptionTechniques: string;
  today: Date;
  date: string;
  newPortion: string;
  newDescriptionPlat: string;
  map: Denrees[];

  constructor(private dataService: AuthFirebaseService,
    private route: Router,
    private toastController: ToastController,
    public modalController: ModalController,
    public creationFiche2Page: CreationFiche2Page) {

  }

  ngOnInit() {
    this.userNom = this.dataService.utilisateur.nom;
    this.prenom = this.dataService.utilisateur.prenom;
    this.tableau1 = this.dataService.tableau1;
    this.tableau2 = this.dataService.tableau2;

    this.today = new Date();
    this.date = this.today.toLocaleDateString('fr-FR');
    this.postes = this.dataService.posteDeTravailListe;
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

  deleteProduit(denree: any) {
    this.suppressionDenree(denree);
    const index: number = this.denrees.indexOf(denree);
    if (index !== -1) {
      this.denrees.splice(index, 1);
    }
    if (denree.produit === this.newProduitRef.produit) {
      this.newProduitRef = null;
    }
  }
  async suppressionDenree(denree: Denrees) {
    const toast = await this.toastController.create({
      message: 'Le produit ' + denree.produit + ' vient d\'être retiré du tableau.',
      duration: 2000
    });
    toast.present();
  }


  async addProduit() {
    const modal = await this.modalController.create({
      component: AjoutProduitPage,
      cssClass: 'addProduit-custom-modal-css'
    });
    modal.onDidDismiss().then((newDenree) => {
      if (newDenree.data !== undefined) {
        console.log('newDenree', newDenree.data);
        this.denrees.push(newDenree.data);
        this.map = this.denrees.map((denree) => {
          const retour = Object.assign({}, denree);
          return retour;
        });
      }
    });
    return await modal.present();
  }

  addNewFiche() {
    this.newTitre = this.creationFiche2Page.newTitre;
    if (this.newTitre === null || this.newDescriptionTechniques === null ||
      this.newPoste === null || this.newProduitRef === null || this.denrees === null) {
      this.erreurCreationFiche();
    } else {
      const newFiche = new Preparation();
      newFiche.type = 'Préparation';
      newFiche.nom = this.newTitre.charAt(0).toUpperCase() + this.newTitre.substr(1);
      newFiche.date = this.today;

      newFiche.denrees = this.map;
      newFiche.descriptionTechniques = this.newDescriptionTechniques.charAt(0).toUpperCase() + this.newDescriptionTechniques.substr(1);
      newFiche.poste = this.newPoste;

      console.log('produit ref', this.newProduitRef);

      newFiche.produitRef = { ...this.newProduitRef };
      newFiche.idUtilisateur = this.dataService.user.uid;
      this.ficheTechnique = newFiche;

      console.log(this.ficheTechnique);
      const navigationExtras: NavigationExtras = {
        state: {
          value: this.ficheTechnique
        }
      };
      this.route.navigate(['vue-avant-sauvegarde/'], navigationExtras);
    }
  }

  refSelect() {
    if (this.denrees.length === 0) {
      this.erreurPasDeDenrees();
    }
  }
  // gestion des erreurs utilisateur

  async erreurCreationFiche() {
    const toast = await this.toastController.create({
      message: 'Merci de bien vouiloir remplir la fiche entierement !',
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
