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

  ficheTechniques: any[] = [];
  FicheRecherche: FicheTechniques;
  isItemAvailable = false;
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
      console.log("plats :", resPlat);
      if (resPlat != undefined) {
        for (let i = 0; i < resPlat.length; i++) {
          this.ficheTechniques.push(resPlat[i]);
        }
      }
    });
  }

  getFicheTechniquespartage() {
    this.dataService.getFicheTechniquesByUserIdList(this.dataService.user.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      console.log(res);
      if (res != undefined) {
        for (let i = 0; i < res.length; i++) {
          this.ficheTechniques.push(res[i]);
        }
      }
      console.log(this.ficheTechniques);

    });
  }

  getFicheTechniquesList() {
    this.dataService.getFicheTechniquesListPrepa().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      if (res != undefined) {
        for (let i = 0; i < res.length; i++) {
          this.ficheTechniques.push(res[i]);
        }
      }
      this.ficheTechniques.sort((a, b) => {
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
    const val = (<HTMLInputElement>ev.target).value;

    if (val && val.trim() != '') {
      this.ficheTechniques = this.ficheTechniques.filter((fiche) => {
        return (fiche.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.isItemAvailable = true;
    } else {
      this.isItemAvailable = false;
      this.ficheTechniques = [];
      this.getFicheTechniquesListPlat();
      this.getFicheTechniquespartage();
      this.getFicheTechniquesList();
    }
  }

  openFiche(fiche: any) {
    if(fiche.type == 'Plat'){
      let navigationExtras: NavigationExtras = {
        state: {
          value: fiche,
          update: this.ficheUpdate
        }
      };
      this.route.navigate(['view-plat'], navigationExtras);
    }else{
      let navigationExtras: NavigationExtras = {
        state: {
          value: fiche,
          update: this.ficheUpdate
        }
      };
      this.route.navigate(['view-preparation'], navigationExtras);
    }
  }


  async openPopover(ev: any, fiche: FicheTechniques) {
    console.log('popover');
    const popover = await this.popoverController.create({
      component: PopoverFicheTechniqueComponent,
      componentProps: {
        fiche: fiche
      },
      event: ev
    });
    return await popover.present();
  }


}
