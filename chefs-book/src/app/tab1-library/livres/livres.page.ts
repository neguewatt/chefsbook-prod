import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { Router, NavigationExtras } from '@angular/router';
import { Livres } from '../../models/livres';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.page.html',
  styleUrls: ['./livres.page.scss'],
})
export class LivresPage implements OnInit {

  utilisateur: Utilisateurs;
  prenom = '';
  livresPerso: Livres[] = [];
  livreRef: Livres[] = [];
  livreAchat: Livres[] = [];
  livreKey: string;
  livreNom: string;
  ficheTechniques: any[] = [];
  ficheTechniquesByLivres: any[] = [];
  postes: any[] = [];
  postesByFT: any[] = [];
  returnLivre = true;
  ficheByLivre = false;
  listeFt = false;
  bibliotheque = false;
  reference = false;
  achat = false;
  chevronBibliotheque = 'chevron-forward-outline';
  chevronLivreRef = 'chevron-forward-outline';
  chevronLivreAchat = 'chevron-forward-outline';
  nav = document.querySelector('ion-nav');

  constructor(private firebaseService: AuthFirebaseService,
              private route: Router,
              private dataService: AuthFirebaseService,
              public alertController: AlertController) { }

  ngOnInit() {

    this.bibliotheque = true;
    this.chevronBibliotheque = 'chevron-down-outline';
    this.ficheByLivre = false;
    // this.getLivresAchat();
    // this.getUtilisateur();
    this.livresPerso = this.dataService.livresPersoListe;
    this.prenom = this.dataService.utilisateur.prenom;
    // this.getLivresRef();
  }


  // getLivresPerso() {
  //   // TODO faire un tri pour les livre (bibliotheque / ref / achat)
  //   try {
  //     this.dataService.getLivrePersoList().snapshotChanges().pipe(
  //       map(changes =>
  //         changes.map(c =>
  //           ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //         )
  //       )
  //     ).subscribe(dataLivres => {
  //       this.livrePerso = dataLivres;
  //     });
  //   } catch (error) {
  //     this.alertNewUser();
  //   }

  // }
  // getLivresRef(){
  //   // TODO faire un tri pour les livre (bibliotheque / ref / achat)
  //   this.dataService.getLivreRefList().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(dataLivres => {
  //     this.livreRef = dataLivres;
  //   });
  // }
  // getLivresAchat() {
  //   // TODO faire un tri pour les livre (bibliotheque / ref / achat)
  //   this.dataService.getLivreAchatList().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(dataLivres => {
  //     this.livreAchat = dataLivres;
  //   });
  // }

  // getUtilisateur() {
  //   let array = [];
  //   this.dataService.getUtilisateur().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(dataUtilisateur => {
  //     array = dataUtilisateur;
  //     this.utilisateur = array[0];
  //     this.prenom = this.utilisateur.prenom;
  //   });
  //   this.getLivresPerso();
  // }

  async alertNewUser() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tutoriel',
      message: 'Bonjour ' + this.prenom + ' pour continuer merci de bien vouloir créer un livre.',
      buttons: ['OK']
    });

    await alert.present();
  }
  openLivre(livre: Livres) {
    const navigationExtras: NavigationExtras = {
      state: {
        livre
      }
    };
    this.route.navigate(['tabs/tab1-library/livres/ft-by-livre'], navigationExtras);

  }

  // creationLivre(){
  //   this.route.navigate(['/creation-livre'])
  // }

  showListeLivre(livre: string) {
    console.log(livre);
    if (livre ===  'maBibliotheque') {
      this.reference = false;
      this.achat = false;
      if (this.bibliotheque ===  false) {
        this.bibliotheque = true;
        this.chevronBibliotheque = 'chevron-down-outline';
        this.chevronLivreAchat = 'chevron-forward-outline';
        this.chevronLivreRef = 'chevron-forward-outline';
      } else {
        this.bibliotheque = false;
        this.chevronBibliotheque = 'chevron-forward-outline';
      }
    } else if (livre ===  'reference') {
      this.achat = false;
      this.bibliotheque = false;
      if (this.reference ===  false) {
        this.reference = true;
        this.chevronLivreRef = 'chevron-down-outline';
        this.chevronBibliotheque = 'chevron-forward-outline';
        this.chevronLivreAchat = 'chevron-forward-outline';
      } else {
        this.reference = false;
        this.chevronLivreRef = 'chevron-forward-outline';
      }
    } else if (livre ===  'achat') {
      this.bibliotheque = false;
      this.reference = false;
      if (this.achat ===  false) {
        this.achat = true;
        this.chevronLivreAchat = 'chevron-down-outline';
        this.chevronBibliotheque = 'chevron-forward-outline';
        this.chevronLivreRef = 'chevron-forward-outline';
      } else {
        this.achat = false;
        this.chevronLivreAchat = 'chevron-forward-outline';
      }
    }
  }

}
