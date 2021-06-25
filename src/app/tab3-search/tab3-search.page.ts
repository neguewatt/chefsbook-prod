import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Preparation } from '../models/preparation';
import { ModalFichePage } from '../pages/modal/modal-fiche/modal-fiche.page';
import { AuthFirebaseService } from '../service/auth-firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3-search.page.html',
  styleUrls: ['tab3-search.page.scss']
})
export class Tab3SearchPage implements OnInit {

  ficheTechniquesAll: any[] = [];
  isItemAvailable = false;
  ficheRecherche: string;
  items = [];
  ficheUpdate = false;

  constructor(private popoverController: PopoverController, private dataService: AuthFirebaseService,
    private route: Router) {
    this.getPlat();
    this.getFicheTechniquespartage();
    this.getPreparation();
  }

  ngOnInit() {
  }

  getPlat() {
    this.dataService.getFicheTechniquesListPlat().subscribe(resPlat => {
      if (resPlat !== undefined) {
        resPlat.forEach(res => {
          this.ficheTechniquesAll.push(res);
        });
      }
    });
  }
  getFicheTechniquespartage() {
    this.dataService.getPrepaPartage().subscribe(resPrepa => {
      if (resPrepa !== undefined) {
        resPrepa.forEach(res => {
          this.ficheTechniquesAll.push(res);
        });
      }
    });
    this.dataService.getPlatPartage().subscribe(resPlat => {
      if (resPlat !== undefined) {
        resPlat.forEach(res => {
          this.ficheTechniquesAll.push(res);
        });
      }
    });
  }
  getPreparation() {
    this.dataService.getFicheTechniquesListPrepa().subscribe(resPrepa => {
      if (resPrepa !== undefined) {
        resPrepa.forEach(res => {
          this.ficheTechniquesAll.push(res);
        });
      }
      this.ficheTechniquesAll.sort((a, b) => {
        if (a.nom < b.nom) {
          return -1;
        }
        if (a.nom > b.nom) {
          return 1;
        }
        return 0;
      });
    });
  }

  getItems(ev: any) {
    const val = (ev.target as HTMLInputElement).value;

    if (val && val.trim() !== '') {
      this.ficheTechniquesAll = this.ficheTechniquesAll.filter((fiche: any) => {
        const retour = (fiche.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return retour;
      });
      this.isItemAvailable = true;
    } else {
      this.isItemAvailable = false;
      this.ficheTechniquesAll = [];
      this.getPlat();
      this.getFicheTechniquespartage();
      this.getPreparation();
    }
  }



  openFiche(fiche: any) {
    if (fiche.type === 'Plat') {
      const navigationExtras: NavigationExtras = {
        state: {
          value: fiche,
          update: this.ficheUpdate
        }
      };
      this.route.navigate(['view-plat'], navigationExtras);
      this.ficheRecherche = '';
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          value: fiche,
          update: this.ficheUpdate
        }
      };
      this.route.navigate(['view-preparation'], navigationExtras);
      this.ficheRecherche = '';
    }
  }
  async openPopover(ev: any, myFiche: Preparation) {
   //  console.log(ev);
    const popover = await this.popoverController.create({
      component: ModalFichePage,
      componentProps: {
        fiche: myFiche
      },
      event: ev,
      animated: true
    });
    popover.onDidDismiss().then((res) => {
     //  console.log('datares', res);
      if (res.data === 'Suppression') {
        this.ficheRecherche = '';
      }
      if (res.data === 'modifier') {
        this.ficheRecherche = '';
      }
    });
    await popover.present();
  }
}
