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
import { AlertController, ToastController } from '@ionic/angular';

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
  password2: string;
  utilisateur: Utilisateurs;
  ordreTableauProduit: AffichageIngredients;
  fond: Fond;
  ecranDefaut: EcranDefaut;
  toDay: Date;
  booleanIconValid: boolean;
  booleanIconValidDif: boolean;

  constructor(private authenticationService: AuthLoginService,
    private dataService: AuthFirebaseService, public toastController: ToastController,
    private route: Router,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  creerUtilisateur() {
    if (this.nom != null && this.prenom != null && this.email != null) {
      if (this.password === this.password2) {
        if(this.booleanIconValid){
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
              if (user) {
                this.authenticationService.signInUser(this.email, this.password).then(
                  (uid) => {
                    if (uid) {
                      const key = uid.toString();
                      newUtilisateur.nom = this.nom.charAt(0).toUpperCase() + this.nom.substr(1);
                      newUtilisateur.prenom = this.prenom.charAt(0).toUpperCase() + this.prenom.substr(1);
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
        }else{
          this.alertexplicationMdp();
        }
      } else {
        this.alertErreurMdp();
      }
    } else {
      this.alertErreurCreation();
    }

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

  testValidationDif($event) {
    if (this.password2 === this.password) {
      this.booleanIconValidDif = true;
    } else {
      this.booleanIconValidDif = false;
    }
  }

  testValidation($event) {
    if (this.password.match(/[0-9]/g) && this.password.match(/[A-Z]/g) &&
      this.password.match(/[a-z]/g) && this.password.match(/[^a-zA-Z\d]/g) &&
      this.password.length >= 10) {
      this.booleanIconValid = true;
    } else {
      this.booleanIconValid = false;
    }
  }

  async alertErreurMdp() {
    const toast = await this.toastController.create({
      message: 'Votre mot de passe n\'est pas confirmé.',
      duration: 3000
    });
    toast.present();
  }

  async alertErreurCreation() {
    const toast = await this.toastController.create({
      message: 'Merci de bien vouloir renseigné tout les champs.',
      duration: 3000
    });
    toast.present();
  }

  async alertexplicationMdp() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention ! ',
      message: 'Votre mot de passe doit contenir : <br/> Au moins une majuscule, '+
      '<br/> Au moins une minuscule, <br/> Au moins un chiffre, <br/> Au moins un caractère spécial, <br> Minimum 10 caractères.',
      buttons: [
        {
          text: 'Valider',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

}
