import { Plats } from './../../../models/plats';
import { Denrees } from 'src/app/models/denrees';
import { Preparation } from 'src/app/models/preparation';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-ref-modal',
  templateUrl: './ingredient-ref-modal.page.html',
  styleUrls: ['./ingredient-ref-modal.page.scss'],
})
export class IngredientRefModalPage implements OnInit {

  newQuantite: number;
  refQuantite: any;
  modalTitle: string;
  today: Date;
  plat: Plats;
  fiche: Preparation ;
  arrayDenrees: Denrees[] = [];
  arrayFichePlat: Preparation[] = [];

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private toastController: ToastController,
    private route: Router) { }

  ngOnInit() {
    this.fiche = this.navParams.data.value;
    this.arrayDenrees = this.navParams.data.value1;
    this.arrayFichePlat = this.navParams.data.value3;
    this.plat = this.navParams.data.value4;
    this.modalTitle = this.navParams.data.paramTitle;
    this.refQuantite = this.fiche.produitRef.quantite;
  }

  onKey(ev: any){
   //  console.log('affiche' , this.newQuantite);
    if(this.newQuantite < 0){
      this.errorQte();
    }
  }

  async closeModal() {
    const onClosedData = 'close';
    await this.modalController.dismiss(onClosedData);
  }

  async ajoutFiche() {
    // création du tableau de denrées générale
    // const newPlat = new Plats();
    this.today = new Date();
    this.plat.date = this.today;
    // mise à jour des denrées pour tableau fiche
    // calcul des denrees identique test
   //  console.log('calcul' , this.newQuantite);
    this.fiche.denrees.forEach(denree => {
     //  console.log('calcul' , denree.quantite);
      const total = (this.newQuantite / this.fiche.produitRef.quantite * denree.quantite);
      denree.quantite = Math.round(total * 100) / 100;
    });
   //  console.log('calcul' , this.fiche.denrees);

    this.plat.descriptionCommercial = this.plat.descriptionCommercial;
    this.plat.nom = this.plat.nom;
    this.plat.livre = this.plat.livre;
    this.plat.poste = this.plat.poste;
    this.plat.portion = this.plat.portion;
    this.plat.idUtilisateur = this.fiche.idUtilisateur;
    this.plat.fichePreparation.push(this.fiche);

    // creation du tableau de fiche plat

   //  console.log('newplat 1 ', this.plat);

    // fin
    // création du tableau de denrées générale
   //  console.log('arrayDenrees 1 ', this.plat.denrees);
    if (!this.plat.denrees) {
      this.plat.denrees = this.fiche.denrees;
    } else {
      this.fiche.denrees.forEach(denree => {
        this.plat.denrees.push(denree);
      });
    }
   //  console.log('arrayDenrees 2 ', this.plat.denrees);

    // fin création plat

   //  console.log('creation Plat FIN : ', this.plat);

    const onClosedData = 'close';
    await this.modalController.dismiss(onClosedData);

    const navigationExtras: NavigationExtras = {
      state: {
        value: this.fiche,
        value1: this.plat.denrees,
        value4: this.plat
      }
    };
    this.route.navigate(['creation-fiche2'], navigationExtras);
  }

  async errorQte() {
    const toast = await this.toastController.create({
      message: 'Merci de bien vouiloir mettre un nombre supperieur à 0 !',
      duration: 2000
    });
    toast.present();
  }

}
