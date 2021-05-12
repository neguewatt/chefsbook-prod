import { Utilisateurs } from './../../models/Utilisateurs';
import { Component, OnInit, Input } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  @Input() titre: string;

  nom: string;
  prenom: string;
  email: string;
  abonnement: string;

  constructor(private dataService: AuthFirebaseService) {
    this.titre = 'Compte';
   }

  ngOnInit() {
    this.nom = this.dataService.utilisateur.nom;
    this.prenom = this.dataService.utilisateur.prenom;
    this.email = this.dataService.utilisateur.email;
    this.abonnement = this.dataService.utilisateur.abonnement;

    if(this.abonnement){
      if(this.abonnement !== 'Gratuite'){
        this.abonnement = 'Payante';
      }
    }

    // this.getUtilisateur();

  }

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
  //     this.nom = this.utilisateur.nom;
  //     this.prenom = this.utilisateur.prenom;
  //     this.email = this.utilisateur.email;
  //   });
  // }



}
