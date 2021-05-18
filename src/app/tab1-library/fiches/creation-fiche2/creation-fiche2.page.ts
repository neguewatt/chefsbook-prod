import { PrepaPage } from './prepa/prepa.page';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { NavigationExtras, Router } from '@angular/router';
import { Preparation } from 'src/app/models/preparation';

@Component({
  selector: 'app-creation-fiche2',
  templateUrl: './creation-fiche2.page.html',
  styleUrls: ['./creation-fiche2.page.scss'],
})
export class CreationFiche2Page implements OnInit {

  userNom: string;
  prenom: string;

  newTitre: string;
  types: string[] = ['Préparation', 'Plat'];
  prepa = true;
  newType: string;


  constructor(private dataService: AuthFirebaseService) {
    // if(!this.dataService.produitsListe){
    //   this.dataService.getProduitListe();
    // }
  }

  ngOnInit() {
    console.log(this.dataService.posteDeTravailListe);
    this.newType = 'Préparation';
  }

  viewFiche(ev){
    console.log(ev);
    if(ev.target.value === 'Préparation') {
      this.prepa = true;
    }else{
      this.prepa = false;
    }
  }





}
