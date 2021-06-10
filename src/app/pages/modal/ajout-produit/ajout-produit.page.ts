import { Unites } from './../../../models/unites';
import { Denrees } from './../../../models/denrees';
import { Produits } from './../../../models/produits';
import { Component, Input, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import produitsListe from './../../../../produits.json';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.page.html',
  styleUrls: ['./ajout-produit.page.scss'],
})
export class AjoutProduitPage implements OnInit {

  @Input() value: any;
  // URL du CSS de la modal : global.scss voir .addProduit-custom-modal-css

  denree: Denrees;
  unites: Unites[] = [];
  newUnite: Unites;
  produits: Produits[] = [];
  produitRechercher: Produits;
  nomProduit: string;
  isItemAvailable = false;
  isnomProduit = false;
  items = [];
  produitUpdate = false;
  quantite: number;
  typeProduit: string;
  qteSupBool = false;
  constructor(
    private modalController: ModalController,
    public toastController: ToastController,
    private dataService: AuthFirebaseService,
    private navParams: NavParams) {
    // creation de la liste produitsListe
    this.produits = produitsListe;
  }

  ngOnInit() {
    this.unites = this.dataService.unitesListe;
    this.quantite = 0;

    if (this.navParams.get('value') !== undefined) {
      this.produitUpdate = true;
      this.nomProduit = this.navParams.get('value').produit;
      this.typeProduit = this.navParams.get('value').typeProduit;
      this.isnomProduit = true;
      this.newUnite = this.navParams.get('value').unite;
      this.quantite = this.navParams.get('value').quantite;
    }
  }

  getItems(ev: KeyboardEvent) {
    const val = (ev.target as HTMLInputElement).value;
    if (val && val.trim() !== '') {
      this.produits = this.produits.filter((produit) => {
        const retour = (produit.nomFr.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return retour;
      });
      this.isItemAvailable = true;
    } else {
      this.isItemAvailable = false;
      this.produits = produitsListe;
    }
  }
  qteChange() {
    if (this.quantite > 0) {
      this.qteSupBool = true;
    } else {
      this.qteSupBool = false;
    }
  }
  ajoutNomPtoduit(produit: Produits) {
    //  console.log(produit);
    this.isnomProduit = true;
    this.isItemAvailable = false;
    this.nomProduit = produit.nomFr;
    this.typeProduit = produit.type;
  }
  onIncrement() {
    this.quantite++;
    this.qteChange();
  }
  onDecrement() {
    this.quantite--;
    this.qteChange();
  }
  async addProduitArray() {
    if (!this.produitUpdate) {
      if (this.quantite <= 0) {
        this.alertErrorQte();
      } else if (this.newUnite.nom === undefined) {
        this.alertErrorUnite();
      }
      else {
        const newDenree = new Denrees();
        newDenree.produit = this.nomProduit;
        newDenree.quantite = this.quantite;
        newDenree.typeProduit = this.typeProduit;
        newDenree.unite = this.newUnite.nom;
       // this.denree = newDenree;
        if (newDenree.produit === undefined) {
          this.presentToastProduit();
        } else if (newDenree.quantite === undefined || newDenree.unite === undefined) {
          this.presentToast();
        } else {
          await this.modalController.dismiss(newDenree);
        }
      }
    }else{
      if (this.quantite <= 0) {
        this.alertErrorQte();
      } else if (this.newUnite.nom === undefined) {
        this.alertErrorUnite();
      }
      else {
        this.navParams.get('value').produit = this.nomProduit;
        this.navParams.get('value').quantite = this.quantite;
        this.navParams.get('value').typeProduit = this.typeProduit;
        this.navParams.get('value').unite = this.newUnite.nom;
        this.denree = this.navParams.get('value');
        if (this.denree.produit === undefined) {
          this.presentToastProduit();
        } else if (this.denree.quantite === undefined || this.denree.unite === undefined) {
          this.presentToast();
        } else {
          await this.modalController.dismiss(this.denree);
        }
      }
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Merci d\'indiquer les quantités souhaitées !',
      duration: 2000
    });
    toast.present();
  }
  async presentToastProduit() {
    const toast = await this.toastController.create({
      message: 'Le produit que vous indiquez n\'est pas present ou est mal orthographié  !',
      duration: 2000
    });
    toast.present();
  }
  async cancel() {
    await this.modalController.dismiss();
  }

  async alertErrorQte() {
    const toast = await this.toastController.create({
      message: 'Erreur sur la quantité !',
      duration: 2000
    });
    toast.present();
  }
  async alertErrorUnite() {
    const toast = await this.toastController.create({
      message: 'Erreur sur l\'unité !',
      duration: 2000
    });
    toast.present();
  }



}
