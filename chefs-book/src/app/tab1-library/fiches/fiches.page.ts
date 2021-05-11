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
  limiteFiche: number;
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
    public alertController: AlertController) { 
      this.limiteFiche = this.dataService.utilisateur.limiteFiche;
    }

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
    // this.getFicheTechniquesListPrepa();
    // this.getFicheTechniquesListPlat();
    // this.getLivresPerso();
    this.livres = this.dataService.livresPersoListe;

  }


  loadData(event) {
    // Using settimeout to simulate api call
    setTimeout(() => {
      // load more data
      // this.getFicheTechniquespartage();
      // this.getPlatspartage();
      // this.getFicheTechniquesListPrepa();
      // this.getFicheTechniquesListPlat();
      // Hide Infinite List Loader on Complete
      event.target.complete();
      // Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.ficheTechniquesAll.length === 3) {
        event.target.disabled = true;
      }
    }, 500);
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  separateLetter(record, recordIndex, records) {
    if (recordIndex === 0) {
      return record.nom[0].toUpperCase();
    }
    const firstPrev = records[recordIndex - 1].nom[0];
    const firstCurrent = record.nom[0];
    if (firstPrev !== firstCurrent) {
      return firstCurrent.toUpperCase();
    }
    return null;
  }

  // getFicheTechniquesListPlat() {
  //   this.dataService.getFicheTechniquesListPlat().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(res => {
  //     if (res !== undefined) {
  //       this.disabledplat = false;
  //       this.plats = res;
  //       res.forEach(resPlat => {
  //         this.ficheTechniquesAll.push(resPlat);
  //       });
  //     }
  //   });
  // }

  //  getFicheTechniquesListPrepa() {
  //   this.dataService.getFicheTechniquesListPrepa().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(res => {
  //     if (res !== undefined) {
  //       this.prepaBoolean = true;
  //       this.prepa = res;
  //       res.forEach(resPrepa => {
  //         this.ficheTechniquesAll.push(resPrepa);
  //       });
  //     }
  //   });
  // }
  // getLivresPerso() {
  //   this.dataService.getLivrePersoList().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(res => {
  //     this.livres = res;
  //   });
  // }


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
    if (fiche.type === 'Plat') {
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
  addficheTech() {
    if (this.livres.length === 0) {
      this.presentAlert();
    } else {
      if(this.ficheTechniquesAll.length === this.limiteFiche){
        this.limitationFichesAlert();
      }else{
        this.route.navigate(['creation-fiche2']);
      }
    }
  }
  async limitationFichesAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'Vous avez ateint votre nombre de fiches maximal pour la version que vous utilisez',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'Merci de bien vouloir créer un livre pour ranger vos futurs fiches techniques',
      buttons: ['OK']
    });

    await alert.present();
  }

}
