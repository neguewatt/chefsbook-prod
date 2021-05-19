import { Utilisateurs } from './../../../models/Utilisateurs';
import { FicheByCom, Preparation } from '../../../models/preparation';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Plats } from 'src/app/models/plats';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  ficheGroup: FicheByCom[] = [];
  ficheTechniquesAll: FicheByCom[] = [];
  iconPlat = true;
  iconPrepa = true;
  ficheUpdate = false;
  newItems: FicheByCom[] = [];
  prepa: Preparation[] = [];
  plats: Plats[] = [];

  constructor(private dataService: AuthFirebaseService,
    private route: Router) { }


  ngOnInit() {
    this.plats = this.dataService.partagePlatsListe;
    this.prepa = this.dataService.partagePrepaListe;
    if (this.prepa) {
      this.prepa.forEach((fiche: Preparation) => {
        this.ficheTechniquesAll.push(fiche);
      });
    }
    if (this.plats) {
      this.plats.forEach((plat: Plats) => {
        this.ficheTechniquesAll.push(plat);
      });
    }

    this.getPlatPartage();
    this.newItems = this.groupByName(this.ficheGroup);

    // this.getFicheTechniquespartage();
  }

  getPlatPartage() {
    this.ficheTechniquesAll.forEach((resPlat: any) => {
      this.dataService.getUtilisateurById(resPlat.idUtilisateur).then((user: Utilisateurs) => {
        const fiche = new FicheByCom();
        fiche.idFiche = resPlat.key;
        fiche.idUtilisateur = user.nom + ' ' + user.prenom;
        fiche.nom = resPlat.nom;
        fiche.livre = resPlat.livre;
        fiche.type = resPlat.type;
        this.ficheGroup.push(fiche);
      });
    });
  }

  groupByName(array: FicheByCom[]) {
    return array.reduce((r, a) => {
      r[a.idUtilisateur] = r[a.idUtilisateur] || [];
      r[a.idUtilisateur].push(a);
      return r;
    }, Object.create(null));
  }

  openFiche(key: string, type: string) {
    console.log(key);
    if ('Préparation' ===  type) {
      this.dataService.getPrepaPartageById(key).then(prepa => {
        console.log(prepa);
        const navigationExtras: NavigationExtras = {
          state: {
            value: prepa,
            update: this.ficheUpdate
          }
        };
        this.route.navigate(['view-preparation'], navigationExtras);
      });
    } else {
      this.dataService.getPlatPartageById(key).then(plat => {
        const navigationExtras: NavigationExtras = {
          state: {
            value: plat,
            update: this.ficheUpdate
          }
        };
        this.route.navigate(['view-plat'], navigationExtras);
      });
    }
  }

}
