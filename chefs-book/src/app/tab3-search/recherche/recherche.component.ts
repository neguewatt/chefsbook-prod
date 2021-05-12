import { Plats } from './../../models/plats';
import { FicheTechniques } from 'src/app/models/ficheTechniques';
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
  items = [];
  ficheUpdate = false;
  prepa: FicheTechniques[];
  plats: Plats[];
  prepaPrtage: FicheTechniques[];
  platsPartage: Plats[];


  constructor(private popoverController: PopoverController, private dataService: AuthFirebaseService,
    private route: Router) { }

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
    if (this.prepaPrtage) {
      this.prepaPrtage.forEach((fiche: any) => {
        this.ficheTechniquesAll.push(fiche);
      });
    }
    if (this.platsPartage) {
      this.platsPartage.forEach((plat: any) => {
        this.ficheTechniquesAll.push(plat);
      });
    }
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


  async openPopover(ev: any, myFiche: FicheTechniques) {
    console.log('popover');
    const popover = await this.popoverController.create({
      component: PopoverFicheTechniqueComponent,
      componentProps: {
        fiche: myFiche
      },
      event: ev
    });
    return await popover.present();
  }


}
