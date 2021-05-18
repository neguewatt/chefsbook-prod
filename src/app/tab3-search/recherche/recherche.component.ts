import { ModalFichePage } from './../../pages/modal/modal-fiche/modal-fiche.page';
import { Plats } from './../../models/plats';
import { Preparation } from 'src/app/models/preparation';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { NavigationExtras, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverFicheTechniqueComponent } from 'src/app/pages/modal/popover-fiche-technique/popover-fiche-technique.component';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
  @Input() titre: string;

  ficheTechniquesAll: any[] = [];
  isItemAvailable = false;
  ficheRecherche: Preparation ;
  items = [];
  ficheUpdate = false;

  constructor(private popoverController: PopoverController, private dataService: AuthFirebaseService,
    private route: Router) { }

  ngOnInit() {
    this.getFicheTechniquesListPlat();
    this.getFicheTechniquespartage();
    this.getFicheTechniquesList();
  }

  getFicheTechniquesListPlat() {
    this.dataService.getFicheTechniquesListPlat().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(resPlat => {
      if (resPlat !== undefined) {
        resPlat.forEach(res => {
          this.ficheTechniquesAll.push(res);
        });
      }
    });
  }

  getFicheTechniquespartage() {
    this.dataService.getPrepaPartage().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(resPrepa => {
      if (resPrepa !== undefined) {
        resPrepa.forEach(res => {
          this.ficheTechniquesAll.push(res);
        });
      }

    });
  }

  getFicheTechniquesList() {
    this.dataService.getFicheTechniquesListPrepa().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(resPrepa => {
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
      this.getFicheTechniquesListPlat();
      this.getFicheTechniquespartage();
      this.getFicheTechniquesList();
    }
  }

  openFiche(fiche: any){
    if(fiche.type ===  'Plat'){
      const navigationExtras: NavigationExtras = {
        state: {
          value: fiche,
          update: this.ficheUpdate
        }
      };
      this.route.navigate(['view-plat'], navigationExtras);
    }else{
      const navigationExtras: NavigationExtras = {
        state: {
          value: fiche,
          update: this.ficheUpdate
        }
      };
      this.route.navigate(['view-preparation'], navigationExtras);
    }
  }


  async openPopover(ev: any, myFiche: Preparation) {
    console.log('popover');
    const popover = await this.popoverController.create({
      component: ModalFichePage,
      componentProps: {
        fiche: myFiche
      },
      event: ev
    });
    return await popover.present();
  }


}