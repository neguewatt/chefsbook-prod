import { PosteDeTravail } from './../../../models/postes';
import { FicheByCom, Preparation } from '../../../models/preparation';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { map } from 'rxjs/operators';
import { Livres } from 'src/app/models/livres';
import { Plats } from 'src/app/models/plats';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { PopoverController } from '@ionic/angular';
import { ModalFichePage } from 'src/app/pages/modal/modal-fiche/modal-fiche.page';

@Component({
  selector: 'app-ft-by-livre',
  templateUrl: './ft-by-livre.page.html',
  styleUrls: ['./ft-by-livre.page.scss'],
})
export class FtByLivrePage implements OnInit {

  livre: Livres;
  livreNom: string;
  livreKey: string;
  livreUpdate: boolean;
  showButtonUpdate: boolean;
  newNom: string;
  ftByLivre: FicheByCom[] = [];
  ficheTechniquesAll: any[] = [];
  prepa: Preparation[] = [];
  plats: Plats[] = [];
  // postes: string[] = [ 'Bar', 'Boulangerie', 'Cuisson poisson', 'Cuisson viande', 'Entremets', 'Garde manger', 'Patisserie'];
  postes: PosteDeTravail[] = [];
  ficheTechByPostes: any[] = [];
  ficheUpdate = false;

  newFtByLivre = [];


  constructor(private dataService: AuthFirebaseService, private popoverController: PopoverController,
    private activRoute: ActivatedRoute, private route: Router) {
    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        this.livre = this.route.getCurrentNavigation().extras.state.livre;
        this.livreNom = this.livre.nom;
        this.livreKey = this.livre.key;
      }
    });
    this.showButtonUpdate = false;
    this.livreUpdate = false;
  }

  ngOnInit() {
    this.plats = this.dataService.platListe;
    this.prepa = this.dataService.preparationListe;
    if (this.prepa) {
      this.prepa.forEach((fiche: any) => {
        this.ficheTechniquesAll.push(fiche);
      });
    }
    if (this.plats) {
      this.plats.forEach((plat: any) => {
        this.ficheTechniquesAll.push(plat);
      });
    }
    this.getFicheByLivre();
    // this.getFtByLivrePartage(this.livreNom);
    // this.getFtByLivre(this.livreNom);
    this.newFtByLivre = this.ftByLivre.reduce((r, a) => {
      r[a.poste] = r[a.poste] || [];
      r[a.poste].push(a);
      return r;
    }, Object.create(null));
  }

  getFicheByLivre() {
    this.ficheTechniquesAll.forEach((allFiche: any) => {
      if (allFiche.livre ===  this.livreNom) {
        // this.dataService.getUtilisateurById(allFiche.idUtilisateur).then((user: Utilisateurs) => {
        const fiche = new FicheByCom();
        fiche.idFiche = allFiche.key;
        fiche.idUtilisateur = '';
        fiche.nom = allFiche.nom;
        fiche.livre = allFiche.livre;
        fiche.type = allFiche.type;
        fiche.poste = allFiche.poste;
        this.ftByLivre.push(fiche);
        // });
      }
    });
    console.log('test2424', this.ftByLivre);
  }
  groupByType(array: any) {
    return array.reduce((r, a) => {
      r[a.poste] = r[a.poste] || [];
      r[a.poste].push(a);
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
  async openPopover(ev: any, key: string, type: string) {
    console.log('popover');
    if ('Préparation' ===  type) {
      this.dataService.getPrepaPartageById(key).then(async fiche => {
        const popover = await this.popoverController.create({
          component: ModalFichePage,
          componentProps: {
            fiche
          },
          event: ev
        });
        return await popover.present();
      });
    } else {
      this.dataService.getPlatPartageById(key).then(async fiche => {
        const popover = await this.popoverController.create({
          component: ModalFichePage,
          componentProps: {
            fiche
          },
          event: ev
        });
        return await popover.present();
      });
    }
  }
  showUpdateLivre() {
    this.showButtonUpdate = true;
    this.livreUpdate = true;
  }
  updateLivre(key: string) {
    console.log(key);
    console.log(this.newNom);

    this.dataService.updateLivre(key, this.newNom);
    this.livreNom = this.newNom;
    this.showButtonUpdate = false;
    this.livreUpdate = false;


  }
}
