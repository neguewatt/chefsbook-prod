import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { Livres } from 'src/app/models/livres';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-creation-livres',
  templateUrl: './creation-livres.page.html',
  styleUrls: ['./creation-livres.page.scss'],
})
export class CreationLivresPage implements OnInit {

  livre: Livres = new Livres();
  livreForm: FormGroup;
  disabled = true;
  user: Utilisateurs;
  nom: string;
  prenom: string;
  titre: string;
  auteur: string;
  reference: boolean;

  constructor(private dataService: AuthFirebaseService,
    private route: Router) { }

  ngOnInit() {
    this.getUtilisateur();
  }

  redirectToStep() {
    const paramLivre = new Livres();
    paramLivre.nom = this.titre;
    paramLivre.auteur= this.auteur;
    paramLivre.reference = false;
    this.livre.nom = paramLivre.nom.charAt(0).toUpperCase()+paramLivre.nom.substr(1);
    if(!paramLivre.auteur){
      this.livre.auteur = this.prenom.charAt(0).toUpperCase()+this.prenom
      .substr(1) + ' ' + this.nom.charAt(0).toUpperCase()+this.nom.substr(1);
    }else{
      this.livre.auteur = paramLivre.auteur;
    }
    this.livre.reference = paramLivre.reference;
    this.livre.photo = '';
    this.livre.position = 'personnel';
    this.livre.idUtilisateur.push(this.dataService.user.uid);

   //  console.log(this.livre);

    this.dataService.addLivre(this.livre);
    this.route.navigate(['./tabs/tab1-library']);
  }

  getUtilisateur() {
    let array = [];
    this.dataService.getUtilisateur().subscribe(dataUtilisateur => {
      array = dataUtilisateur;
      this.user = array[0];
      this.nom = this.user.nom;
      this.prenom = this.user.prenom;
    });
  }
  buttonValide(ev: any){
    const val = (ev.target as HTMLInputElement).value;

    if (val && val.trim() !== '') {
      this.disabled = false;
    }else{
      this.disabled = true;
    }
  }


  ajoutPhoto(){

  }
}
