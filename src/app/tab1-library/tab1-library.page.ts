import { Abonnement } from '../models/abonnement';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { Livres } from '../models/livres';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1-library',
  templateUrl: 'tab1-library.page.html',
  styleUrls: ['tab1-library.page.scss']
})
export class Tab1LibraryPage implements OnInit {

  fichesBoolean: boolean;
  livreBoolean: boolean;
  comBoolean: boolean;
  livrePerso: Livres[];
  ficheTechniquesAll: any[] = [];
  dataReturned: any;
  chosen = 'border-bottom: 5px solid #fff;';
  notChosen = 'margin-bottom: 5px;';
  textChosen = 'color:white';
  textNotChosen = 'color:#ccc';

  constructor(
    private dataService: AuthFirebaseService,
    private activRoute: ActivatedRoute,
    private route: Router,
    public alertController: AlertController) {
    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        this.fichesBoolean = this.route.getCurrentNavigation().extras.state.fichesBoolean;
        this.livreBoolean = this.route.getCurrentNavigation().extras.state.livreBoolean;
        this.comBoolean = this.route.getCurrentNavigation().extras.state.comBoolean;
      }
    });
    this.livreBoolean = true;
  }

  ngOnInit() {
    this.livrePerso = this.dataService.livresPersoListe;
    console.log(this.dataService.utilisateur);
  }

  segmentChanged(page: string) {
    console.log(page);
    this.fichesBoolean = false;
    this.comBoolean = false;
    this.livreBoolean = false;
    switch (page) {
      case 'livreBoolean':
        this.livreBoolean = true;
        break;
      case 'comBoolean':
        this.comBoolean = true;
        break;
      case 'fichesBoolean':
        this.fichesBoolean = true;
        break;
    }
  }

  addficheTech() {
    if (this.livrePerso.length ===  0) {
      this.presentAlert();
    } else {

      console.log(this.dataService.limitFiches <= this.dataService.fichesTechniqueAll.length);

      if(this.dataService.limitFiches <= this.dataService.fichesTechniqueAll.length){
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
