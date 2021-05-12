import { Plats } from './../../../models/plats';
import { Denrees } from 'src/app/models/denrees';
import { FicheTechniques } from 'src/app/models/ficheTechniques';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { FichePlat } from 'src/app/models/fichePlat';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ingredient-ref-modal',
  templateUrl: './ingredient-ref-modal.page.html',
  styleUrls: ['./ingredient-ref-modal.page.scss'],
})
export class IngredientRefModalPage implements OnInit {

  quantite: any;
  modalTitle: string;
  today: Date;
  plat: Plats;
  fiche: FicheTechniques;
  arrayDenrees: Denrees[] = [];
  arrayFichePlat: FicheTechniques[] = [];

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private route: Router, private datepipe: DatePipe,
    private dataService: AuthFirebaseService) { }

  ngOnInit() {
    this.fiche = this.navParams.data.value;
    this.arrayDenrees = this.navParams.data.value1;
    this.arrayFichePlat = this.navParams.data.value3;
    this.plat = this.navParams.data.value4;
    this.modalTitle = this.navParams.data.paramTitle;
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
    this.fiche.denrees.forEach(denree => {
      const total = (this.quantite / this.fiche.produitRef.quantite * denree.quantite);
      denree.quantite = Math.round(total * 100) / 100;
    });
    // for (let i = 0; i < this.fiche.denrees.length; i++) {
    //   // newQTE diviser par refQTE multiplier par oldQte = total
    //   let total = (this.quantite / this.fiche.produitRef.quantite * this.fiche.denrees[i].quantite)
    //   this.fiche.denrees[i].quantite = Math.round(total * 100) / 100;
    // }

    console.log('denrées fiche après calcul : ' , this.fiche.denrees);

    this.plat.descriptionCommercial = this.plat.descriptionCommercial;
    this.plat.nom = this.plat.nom;
    this.plat.livre = this.plat.livre;
    this.plat.poste = this.plat.poste;
    this.plat.portion = this.plat.portion;
    this.plat.idUtilisateur = this.fiche.idUtilisateur;
    this.plat.fichePreparation.push(this.fiche);

    // creation du tableau de fiche plat
    // if (!this.arrayFichePlat) {
    //   this.arrayFichePlat = this.plat.fichePlats;
    //   console.log('test 1 ', this.arrayFichePlat);
    // } else {
    //   this.arrayFichePlat.push(this.plat.fichePlats[0]);
    //   console.log('test 2 ', this.arrayFichePlat);
    // }
    console.log('newplat 1 ', this.plat);

    // fin
    // création du tableau de denrées générale
    console.log('arrayDenrees 1 ', this.plat.denrees);
    if (!this.plat.denrees) {
      this.plat.denrees = this.fiche.denrees;
    } else {
      this.fiche.denrees.forEach(denree => {
        this.plat.denrees.push(denree);
      });
    }
    console.log('arrayDenrees 2 ', this.plat.denrees);


    // const sumOfAges = this.arrayDenrees.reduce((sum, currentValue) => {
    //   return sum + currentValue.quantite;
    // }, 0);

    // const result = this.arrayDenrees.reduce(function (r, a) {
    //   r[a.produit] = r[a.produit] || [];
    //   r[a.produit].push(a);
    //   return r;
    // }, Object.create(null));

    // console.log('new arrayDenrees', result);

    // this.plat.fichePlats = this.arrayFichePlat;
    // this.plat.denrees = this.arrayDenrees;
    // fin tableau denrées


    // fin création plat

    console.log('creation Plat FIN : ', this.plat);

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

}
