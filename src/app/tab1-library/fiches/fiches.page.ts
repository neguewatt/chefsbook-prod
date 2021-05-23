import { ModalFichePage } from './../../pages/modal/modal-fiche/modal-fiche.page';
import { Plats } from './../../models/plats';
import { Livres } from 'src/app/models/livres';
import { Preparation } from 'src/app/models/preparation';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, IonVirtualScroll, PopoverController } from '@ionic/angular';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Router, NavigationExtras } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.page.html',
  styleUrls: ['./fiches.page.scss'],
})
export class FichesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  cssButtonSelect = '--color: #F03434;  font-family: "Roboto-Medium";';
  cssButtonSelectNo = '--color: #F03434; opacity: 50%';

  toutesBoolean = false;
  prepaBoolean = false;
  platsBoolean = false;
  disabledplat = true;
  livres: Livres[] = [];
  livreKey: string;
  livreNom: string;
  ficheTechniquesAll: any[] = [];
  prepa: Preparation[] = [];
  plats: Plats[] = [];
  ficheTechniquesByLivres: any[] = [];

  ficheUpdate = false;

  iconPlat = true;
  iconPrepa = true;

  constructor(private popoverController: PopoverController,
    private dataService: AuthFirebaseService,
    private route: Router,
    public alertController: AlertController) { }

  ngOnInit() {
    this.getFicheTechniquesListPrepa();
    this.getFicheTechniquesListPlat();
    this.livres = this.dataService.livresPersoListe;
  }

  getFicheTechniquesListPlat() {
    this.dataService.getFicheTechniquesListPlat().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      if (res !== undefined) {
        this.disabledplat = false;
        this.dataService.platListe = res;
        this.plats = res;
        this.ficheTechniquesAll = [];
        this.getAllFiche();
      }
    });
  }
   getFicheTechniquesListPrepa() {
    this.dataService.getFicheTechniquesListPrepa().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      if (res !== undefined) {
        this.prepaBoolean = true;
        this.dataService.preparationListe = res;
        this.prepa = res;
        this.ficheTechniquesAll = [];
        this.getAllFiche();
      }
    });
  }

  getAllFiche(){
    this.prepa.forEach(element => {
      this.pushFicheIfNotExist(element);
    });
    this.plats.forEach(element => {
      this.pushFicheIfNotExist(element);
    });
  }

  pushFicheIfNotExist(ficheA: any){
    const index = this.ficheTechniquesAll.findIndex((e) => e.key === ficheA.key);
    console.log(index);

    if(index === -1){
      this.ficheTechniquesAll.push(ficheA);
    }else{
      this.ficheTechniquesAll[index] = ficheA;
    }
    this.dataService.fichesTechniqueAll = this.ficheTechniquesAll;
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
