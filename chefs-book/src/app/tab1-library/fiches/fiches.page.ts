import { ModalFichePage } from './../../pages/modal/modal-fiche/modal-fiche.page';
import { Plats } from './../../models/plats';
import { Livres } from 'src/app/models/livres';
import { FicheTechniques } from 'src/app/models/ficheTechniques';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, IonRefresher, IonVirtualScroll, PopoverController } from '@ionic/angular';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.page.html',
  styleUrls: ['./fiches.page.scss'],
})
export class FichesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  toutesBoolean = false;
  prepaBoolean = false;
  platsBoolean = false;
  disabledplat = true;
  livres: Livres[] = [];
  livreKey: string;
  livreNom: string;
  ficheTechniquesAll: any[] = [];
  prepa: FicheTechniques[] = [];
  plats: Plats[] = [];
  ficheTechniquesByLivres: any[] = [];

  ficheUpdate = false;

  colorA = 'font-weight: bold';
  colorB = '';

  iconPlat = true;
  iconPrepa = true;

  constructor(private popoverController: PopoverController,
    private dataService: AuthFirebaseService,
    private route: Router,
    public alertController: AlertController) { }

  ngOnInit() {
    this.plats = this.dataService.platListe;
    this.prepa = this.dataService.preparationListe;
    if (this.prepa) {
      this.prepaBoolean = true;
      this.prepa.forEach((fiche: any) => {
        this.ficheTechniquesAll.push(fiche);
      });
    } else if (this.plats) {
      this.platsBoolean = true;
    }

    if (this.plats) {
      this.disabledplat = false;
      this.plats.forEach((plat: any) => {
        this.ficheTechniquesAll.push(plat);
      });
    }
    this.livres = this.dataService.livresPersoListe;
  }


  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.virtualScroll.checkEnd();
      if (this.ficheTechniquesAll.length ===  3) {
        event.target.disabled = true;
      }
    }, 500);
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  separateLetter(record, recordIndex, records) {
    if (recordIndex ===  0) {
      return record.nom[0].toUpperCase();
    }
    const firstPrev = records[recordIndex - 1].nom[0];
    const firstCurrent = record.nom[0];
    if (firstPrev !== firstCurrent) {
      return firstCurrent.toUpperCase();
    }
    return null;
  }

  segmentChanged(page: any) {
    console.log(page);
    this.toutesBoolean = false;
    this.prepaBoolean = false;
    this.platsBoolean = false;
    const section = page;
    switch (section) {
      case 'toutesBoolean':
        this.toutesBoolean = true;
        break;
      case 'prepaBoolean':
        this.prepaBoolean = true;
        break;
      case 'platsBoolean':
        this.platsBoolean = true;
        break;
    }
  }
  async openPopover(ev: any, fiche: any) {
    console.log('popover');
    const popover = await this.popoverController.create({
      component: ModalFichePage,
      componentProps: {
        fiche
      },
      event: ev
    });
    popover.onDidDismiss().then((res) => {
      this.ngOnInit();
    });


    return await popover.present();
  }
  openFiche(fiche: any) {
    if (fiche.type ===  'Plat') {
      const navigationExtras: NavigationExtras = {
        state: {
          value: fiche,
          update: this.ficheUpdate
        }
      };
      this.route.navigate(['view-plat'], navigationExtras);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          value: fiche,
          update: this.ficheUpdate
        }
      };
      this.route.navigate(['view-preparation'], navigationExtras);
    }
  }


}
