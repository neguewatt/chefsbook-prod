import { Unites } from './../../../models/unites';
import { Denrees } from './../../../models/denrees';
import { Produits } from './../../../models/produits';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.page.html',
  styleUrls: ['./ajout-produit.page.scss'],
})
export class AjoutProduitPage implements OnInit {

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

  constructor(
    private modalController: ModalController,
    public toastController: ToastController,
    private dataService: AuthFirebaseService) {
      // creation de la liste produitsListe
      this.dataService.getProduitList();
     }

  ngOnInit() {
    this.unites = this.dataService.unitesListe;
    console.log(this.unites);
    
    this.quantite = 0;
    this.produits = this.dataService.produitsListe;
    // this.getProduit();
  }

  // getProduit() {
  //   this.dataService.getProduitList().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(res => {
  //     console.log(res);

  //     if (res != undefined) {
  //       for (let i = 0; i < res.length; i++) {
  //         this.produits.push(res[i]);
  //       }
  //     }
  //   });
  // }


  getItems(ev: KeyboardEvent) {
    const val = (<HTMLInputElement>ev.target).value;
    if (val && val.trim() != '') {
      this.produits = this.produits.filter((produit) => {
        return (produit.nomFr.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.isItemAvailable = true;
    } else {
      this.isItemAvailable = false;
      this.produits = this.dataService.produitsListe;
    }
  }
  ajoutNomPtoduit(produit: Produits){
    console.log(produit);
    this.isnomProduit = true;
    this.isItemAvailable = false;
    this.nomProduit = produit.nomFr;
    this.typeProduit = produit.type
  }
  onIncrement() {
    this.quantite++;
  }
  onDecrement() {
    this.quantite--;
  }
  async addProduitArray() {
    const newDenree = new Denrees();
    newDenree.produit = this.nomProduit;
    newDenree.quantite = this.quantite;
    newDenree.typeProduit = this.typeProduit;
    newDenree.unite = this.newUnite.nom;
    this.denree = newDenree;    
    this.produits.forEach(element => {
      if(this.denree.produit == element.nomFr){
        
      }
    });
    if(this.denree.produit == null){
      this.presentToastProduit()
    }else if(this.denree.quantite == null || this.denree.unite == null){
      this.presentToast()
    }else{
      await this.modalController.dismiss(this.denree);
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
  async cancel(){
    await this.modalController.dismiss();
  }

}