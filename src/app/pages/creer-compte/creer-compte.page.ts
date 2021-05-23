import { EcranDefaut } from './../../models/ecranDefaut';
import { AffichageIngredients } from './../../models/affichageIngredients';
import { Utilisateurs } from './../../models/Utilisateurs';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthLoginService } from 'src/app/service/auth-login.service';
import { Router, NavigationExtras } from '@angular/router';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Fond } from './../../models/fond';
import * as firebase from 'firebase';

@Component({
  selector: 'app-creer-compte',
  templateUrl: './creer-compte.page.html',
  styleUrls: ['./creer-compte.page.scss'],
})
export class CreerUtilisateurPage implements OnInit {


  nom: string;
  prenom: string;
  email: string;
  password: string;
  utilisateur: Utilisateurs;
  ordreTableauProduit: AffichageIngredients;
  fond: Fond;
  ecranDefaut: EcranDefaut;
  toDay: Date;

  constructor(private authenticationService: AuthLoginService,
    private dataService: AuthFirebaseService,
    private route: Router) { }

  ngOnInit() {
  }

  creerUtilisateur() {
    this.toDay = new Date();
    const newUtilisateur = new Utilisateurs();
    const newDateCreation = new Date(this.toDay);
    const newtableau = new AffichageIngredients();
    const newFond = new Fond();
    const newEcran = new EcranDefaut();
    console.log('createUser');
    this.creatUsers(this.email, this.password).then(
      (user) => {
        console.log(user);
        if(user){
          this.authenticationService.signInUser(this.email, this.password).then(
            (uid) => {
              if(uid){
                const key = uid.toString();
                newUtilisateur.nom =this.nom.charAt(0).toUpperCase()+this.nom.substr(1);
                newUtilisateur.prenom = this.prenom.charAt(0).toUpperCase()+this.prenom.substr(1);
                newUtilisateur.email = this.email;
                newUtilisateur.idUtilisateur = uid.toString();
                newUtilisateur.dateCreation = newDateCreation;
                console.log(newUtilisateur);
                newtableau.natureUniteQuantite = true;
                newtableau.quantiteUniteNature = false;
                newtableau.idUtilisateur = uid.toString();
                console.log(newtableau);
                newFond.idUtilisateur = uid.toString();
                newFond.clair = true;
                newFond.sombre = false;
                console.log(newFond);
                newEcran.idUtilisateur = uid.toString();
                newEcran.mesFiches = false;
                newEcran.mesLivres = true;
                newEcran.profil = false;
                newEcran.recherche = false;
                newEcran.communaute = false;
                console.log(newEcran);
                this.utilisateur = newUtilisateur;
                this.ordreTableauProduit = newtableau;
                this.fond = newFond;
                this.ecranDefaut = newEcran;
                this.dataService.addUtilisateur(key, this.utilisateur);
                this.dataService.addOrderTable(this.ordreTableauProduit);
                this.dataService.addFond(this.fond);
                this.dataService.addEcranDefaut(this.ecranDefaut);
                this.dataService.user = firebase.default.auth().currentUser;
                console.log(this.dataService.user);
                this.route.navigate(['chargement']);
              }
            }
          ).catch(
            (error) => {
              console.log(error);
            }
          );
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  creatUsers(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
          (data) => {
            resolve(data.user);
            console.log('Connecté', data.user.uid);
          },
          (error) => {
            console.log('error1', error);
            reject(error);
          }
        );
      }
    );
  }

}
