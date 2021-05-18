import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
 @Input() titre: string;

 dateInscription: string;
 connecte: string;
 toggleConnecte: boolean;
 countFT: number;
 limitFiches: number;

  constructor( private dataService: AuthFirebaseService ) {

    // this.dataService.getFichesTechniqueAll(); // On reunis toutes les fiche de l'utilisateur
  }

  ngOnInit() {
    const _date = new Date(this.dataService.utilisateur.dateCreation.seconds * 1000);
    this.dateInscription = _date.toLocaleDateString();
    this.limitFiches = this.dataService.limiteFiche;
    this.toggleConnecte = true; // normalement à verifier en foction de la connection du téléphone
    this.connection();
    console.log(this.dataService.fichesTechniqueAll);

    this.countFT = this.dataService.fichesTechniqueAll.length;
    // this.getFicheTechniquesListPrepa();
  }

  connection(){
    if (this.toggleConnecte ===  true){
      this.connecte = 'En ligne';
    }else{
      this.connecte = 'Hors-ligne';
    }
  }

}
