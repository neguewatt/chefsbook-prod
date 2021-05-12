import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { Livres } from 'src/app/models/livres';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { NavigationExtras, Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder,
    private dataService: AuthFirebaseService,
    private route: Router) { }

  ngOnInit() {
    this.getUtilisateur();
    this.initForm();
  }

  initForm() {
    this.livreForm = this.formBuilder.group({
      titre: ['', Validators.required],
      auteur: [''],
      reference: [false],
    });

    this.livreForm.statusChanges.subscribe((status) => {
      const retour =  status === 'VALID' ? this.disabled = false : this.disabled = true;
      return retour;
    });
  }

  redirectToStep() {
    const paramLivre = this.livreForm.value;
    this.livre.nom = paramLivre.titre.charAt(0).toUpperCase()+paramLivre.titre.substr(1);
    if(!paramLivre.auteur){
      this.livre.auteur = this.prenom.charAt(0).toUpperCase()+this.prenom
      .substr(1) + ' ' + this.nom.charAt(0).toUpperCase()+this.nom.substr(1);
    }else{
      this.livre.auteur = paramLivre.auteur;
    }
    this.livre.référence = paramLivre.reference;
    this.livre.photo = '';
    this.livre.position = 'personnel';
    this.livre.idUtilisateur.push(this.dataService.user.uid);

    console.log(this.livre);

    this.dataService.addLivre(this.livre);
    this.route.navigate(['/tabs/tab1-library']);
  }

  getUtilisateur() {
    let array = [];
    this.dataService.getUtilisateur().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(dataUtilisateur => {
      array = dataUtilisateur;
      this.user = array[0];
      this.nom = this.user.nom;
      this.prenom = this.user.prenom;
    });
  }

}
