import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../service/auth-firebase.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4-profil.page.html',
  styleUrls: ['./tab4-profil.page.scss'],
})
export class Tab4ProfilPage implements OnInit {

  dateInscription: string;
 connecte: string;
 toggleConnecte: boolean;
 countFT: number;
 limitFiches: number;
 supprimeMoiPlusTard = false;

  constructor( private dataService: AuthFirebaseService ) {

    // this.dataService.getFichesTechniqueAll(); // On reunis toutes les fiche de l'utilisateur
  }

  ngOnInit() {
    const _date = new Date(this.dataService.utilisateur.dateCreation.seconds * 1000);
    this.dateInscription = _date.toLocaleDateString();
    this.limitFiches = this.dataService.limitFiches;
    this.toggleConnecte = true; // normalement à verifier en foction de la connection du téléphone
    this.connection();
   //  console.log(this.dataService.fichesTechniqueAll);

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
