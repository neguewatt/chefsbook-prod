import { Denrees } from 'src/app/models/denrees';
import { Preparation } from 'src/app/models/preparation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Plats } from 'src/app/models/plats';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Utilisateurs } from 'src/app/models/Utilisateurs';

@Component({
  selector: 'app-view-plat',
  templateUrl: './view-plat.page.html',
  styleUrls: ['./view-plat.page.scss'],
  styles: [`
  .even { background-color: #FFF1F1; }
  .odd { background-color: #FFFFFF; }
  `],
})
export class ViewPlatPage implements OnInit {

  plat: Plats;
  denrees: Denrees[];
  userNom: string;
  prenom: string;
  denreesDisabled = false;
  chevronDenreesOn = 'chevron-down-outline';
  tableau1 = true;
  tableau2 = true;
  date: string;
  newPlatDenrees = {};
  newFicheDenrees = {};

  constructor(private dataService: AuthFirebaseService,
    public modalController: ModalController,
    private activRoute: ActivatedRoute,
    private route: Router) {

    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation() !== null) {
        console.log('queryparam ', this.route.getCurrentNavigation().extras.state);
        this.plat = this.route.getCurrentNavigation().extras.state.value; // arrive de creation-fiche2 [plat]
      }
    });
  }


  ngOnInit() {
    console.log(this.plat);
    const _date = new Date(this.plat.date.seconds * 1000);
    this.date = _date.toLocaleDateString();
    this.getUtilisateurById();
    this.tableau1 = this.dataService.tableau1;
    this.tableau2 = this.dataService.tableau2;
    // this.getOrdreTableau();

    this.newPlatDenrees = this.groupByType(this.plat.denrees);
  }


  getUtilisateurById() {
    this.dataService.getUtilisateurById(this.plat.idUtilisateur).then((user: Utilisateurs) => {
      this.userNom = user.nom;
      this.prenom = user.prenom;
    });
  }

  // getOrdreTableau() {
  //   this.dataService.getOrdreTableauFT().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(res => {
  //     if (res[0].natureUniteQuantite) {
  //       this.tableau1 = false;
  //       this.tableau2 = true;
  //     } else {
  //       this.tableau1 = true;
  //       this.tableau2 = false;
  //     }
  //     console.log('getOrdreTableau', res[0].natureUniteQuantite);
  //   });
  // }


  showDenrees() {
    if (this.denreesDisabled === true) {
      this.denreesDisabled = false;
      this.chevronDenreesOn = 'chevron-down-outline';
    } else {
      this.denreesDisabled = true;
      this.chevronDenreesOn = 'chevron-forward-outline';
    }
  }

  groupByType(array: any) {
    return array.reduce((r, a) => {
      r[a.typeProduit] = r[a.typeProduit] || [];
      r[a.typeProduit].push(a);
      return r;
    }, Object.create(null));
  }

}
