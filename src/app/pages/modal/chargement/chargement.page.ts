import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';

@Component({
  selector: 'app-chargement',
  templateUrl: './chargement.page.html',
  styleUrls: ['./chargement.page.scss'],
})
export class ChargementPage implements OnInit {


  uid: string;

  constructor(
    private dataService: AuthFirebaseService,
    private route: Router,
    private loadingController: LoadingController) {

    }

  ngOnInit() {
    this.presentLoading();
  }
  ecranDefaut() {
    this.dataService.getEcranDefaut().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      console.log('resulta tab', res);
      if (res[0].mesFiches){
        const navigationExtras: NavigationExtras = {
          state: {
            fichesBoolean: res[0].mesFiches,
            livreBoolean: res[0].mesLivres,
            comBoolean: res[0].communaute,
          }
        };
        this.route.navigate(['/tabs/tab1-library'], navigationExtras);
      } else if (res[0].mesLivres){
        const navigationExtras: NavigationExtras = {
          state: {
            fichesBoolean: res[0].mesFiches,
            livreBoolean: res[0].mesLivres,
            comBoolean: res[0].communaute,
          }
        };
        this.route.navigate(['/tabs/tab1-library'], navigationExtras);
      } else if (res[0].communaute){
        const navigationExtras: NavigationExtras = {
          state: {
            fichesBoolean: res[0].mesFiches,
            livreBoolean: res[0].mesLivres,
            comBoolean: res[0].communaute,
          }
        };
        this.route.navigate(['/tabs/tab1-library'], navigationExtras);
      } else if (res[0].recherche){
        this.route.navigate(['/tabs/tab3']);
      } else if (res[0].profil){
        this.route.navigate(['/tabs/tab4']);
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.dataService.getCompteUtilisateur();
    this.ecranDefaut();
    this.dataService.getFichesTechniqueAll();
    this.dataService.getformule();
  }

}
