import { PosteDeTravail } from 'src/app/models/postes';
import { Denrees } from 'src/app/models/denrees';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Plats } from 'src/app/models/plats';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Utilisateurs } from 'src/app/models/Utilisateurs';

@Component({
  selector: 'app-view-plat',
  templateUrl: './view-plat.page.html',
  styleUrls: ['./view-plat.page.scss'],
  styles: [`
  .even { background-color: #F2F2F2; }
  .odd { background-color: #FFFFFF; }
  `],
})
export class ViewPlatPage implements OnInit {


  plat: Plats;
  fiche: Plats;
  denrees: Denrees[];
  userNom: string;
  prenom: string;
  denreesDisabled = false;
  chevronDenreesOn = 'chevron-down-outline';
  tableau1 = true;
  tableau2 = true;
  date: string;
  postes: PosteDeTravail[] = [];
  newPlatDenrees = [];
  newFicheDenrees = [];
  ficheUpdate: boolean;
  showButtonUpdate = false;
  newNom: string;

  constructor(private dataService: AuthFirebaseService,
    public modalController: ModalController,
    private activRoute: ActivatedRoute,
    private route: Router) {

    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation() !== null) {
       //  console.log('queryparam ', this.route.getCurrentNavigation().extras.state);
        this.plat = this.route.getCurrentNavigation().extras.state.value; // arrive de creation-fiche2 [plat]
      }
      if (this.route.getCurrentNavigation().extras.state) {
       //  console.log('param ok ', this.route.getCurrentNavigation().extras.state);
        this.fiche = this.route.getCurrentNavigation().extras.state.value;
        this.fiche.key = this.route.getCurrentNavigation().extras.state.key;
        if (this.route.getCurrentNavigation().extras.state.update){
          this.showUpdateFiche();
        }
      }
    });
  }


  ngOnInit() {
   //  console.log(this.plat);
    const _date = new Date(this.plat.date.seconds * 1000);
    this.date = _date.toLocaleDateString();
    this.getUtilisateurById();
    this.tableau1 = this.dataService.tableau1;
    this.tableau2 = this.dataService.tableau2;
    this.postes = this.dataService.posteDeTravailListe;
    // this.getOrdreTableau();

    this.newPlatDenrees = this.plat.denrees.reduce((r, a) => {
      // a.toggle=false;
      r[a.typeProduit] = r[a.typeProduit] || [];
      r[a.typeProduit].push(a);
      return r;
    }, Object.create(null));
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
  //    //  console.log('getOrdreTableau', res[0].natureUniteQuantite);
  //   });
  // }


  showDenrees(){
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

  showUpdateFiche(){
    this.showButtonUpdate = !this.showButtonUpdate;
    this.ficheUpdate = !this.ficheUpdate;
  }


  updateFiche(){
    const _date = new Date();
    const newFiche = new Plats();
    newFiche.key = this.fiche.key;
    newFiche.date = new Date(_date);
    newFiche.descriptionTechnique = this.plat.descriptionTechnique;
    newFiche.descriptionCommercial = this.plat.descriptionCommercial;
    newFiche.denrees = this.fiche.denrees;
    newFiche.idPartage = this.plat.idPartage;
    newFiche.idUtilisateur = this.plat.idUtilisateur;
    newFiche.livre = this.plat.livre;
    newFiche.nom = this.plat.nom;
    newFiche.poste = this.plat.poste;
    newFiche.portion = this.plat.portion;
    newFiche.fichePreparation = this.plat.fichePreparation;
    this.fiche = newFiche;
   //  console.log(this.fiche);
    try {
      this.dataService.updateFichePlat(this.fiche.key ,this.fiche);
      this.route.navigate(['tabs']);
    } catch (error) {
      console.log(error);
    }


  }

}
