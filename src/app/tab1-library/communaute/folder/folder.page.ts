
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { FicheByCom, Preparation } from '../../../models/preparation';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Plats } from 'src/app/models/plats';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {


  ficheTechniquesAll: any[] = [];
  iconPlat = true;
  iconPrepa = true;
  ficheUpdate = false;
  newItems: Array<any> = [];
  prepa: Preparation[] = [];
  plats: Plats[] = [];

  constructor(private dataService: AuthFirebaseService,
    private route: Router) {
      this.getPlatPartage();
      this.getFicheTechniquespartage(); }


  ngOnInit() {
    this.newItems = this.ficheTechniquesAll.reduce((r, a) => {
      r[a.idUtilisateur] = r[a.idUtilisateur] || [];
      r[a.idUtilisateur].push(a);
      return r;
    }, Object.create(null));
    console.log(this.ficheTechniquesAll);
  }

  getPlatPartage() {
    this.dataService.getPlatPartage().subscribe((resPlat: Plats[]) => {
      if (resPlat.length !== 0) {
        resPlat.forEach(plat => {
          this.dataService.getUtilisateurById(plat.idUtilisateur).subscribe((user: Utilisateurs[]) => {
            if (user.length !== 0) {
              const fiche = new FicheByCom();
              fiche.idFiche = plat.key;
              fiche.idUtilisateur = user[0].nom + ' ' + user[0].prenom;
              fiche.nom = plat.nom;
              fiche.livre = plat.livre;
              fiche.type = plat.type;
              this.ficheTechniquesAll.push(fiche);
            }
          });
        });
      }
    });
  }
  getFicheTechniquespartage() {
    this.dataService.getPrepaPartage().subscribe((resPrepa: Preparation[]) => {
      console.log('ftPartagé :', resPrepa);
      if (resPrepa.length !== 0) {
        this.dataService.partagePrepaListe = resPrepa;
        resPrepa.forEach(resFiche => {
          this.dataService.getUtilisateurById(resFiche.idUtilisateur).subscribe((user: Utilisateurs[]) => {
            if (user.length !== 0) {
              const fiche = new FicheByCom();
              fiche.idFiche = resFiche.key;
              fiche.idUtilisateur = user[0].nom + ' ' + user[0].prenom;
              fiche.nom = resFiche.nom;
              fiche.livre = resFiche.livre;
              fiche.type = resFiche.type;
              this.ficheTechniquesAll.push(fiche);
            }
          });
        });
      }
    });
  }


  // groupByName(array: any) {
  //   return array.reduce((r, a) => {
  //     r[a.idUtilisateur] = r[a.idUtilisateur] || [];
  //     r[a.idUtilisateur].push(a);
  //     return r;
  //   }, Object.create(null));
  // }

  openFiche(keyFiche: string, type: string) {
    if ('Préparation' === type) {
      this.dataService.getPrepaPartageById(keyFiche).then(prepa => {
       //  console.log(prepa);
        const navigationExtras: NavigationExtras = {
          state: {
            value: prepa,
            update: this.ficheUpdate,
            key: keyFiche
          }
        };
        this.route.navigate(['view-preparation'], navigationExtras);
      });
    } else {
      this.dataService.getPlatPartageById(keyFiche).then(plat => {
        const navigationExtras: NavigationExtras = {
          state: {
            value: plat,
            update: this.ficheUpdate,
            key: keyFiche
          }
        };
        this.route.navigate(['view-plat'], navigationExtras);
      });
    }
  }



}
