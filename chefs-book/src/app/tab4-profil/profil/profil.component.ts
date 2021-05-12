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
 countFT = 0;
 limitFiches = 5;

  constructor( private dataService: AuthFirebaseService ) { }

  ngOnInit() {
    const _date = new Date(this.dataService.utilisateur.date.seconds * 1000);
    this.dateInscription = _date.toLocaleDateString();

    this.limitFiches = this.dataService.utilisateur.limiteFiche;
    this.toggleConnecte = true; // normalement à verifier en foction de la connection du téléphone
    this.connection();
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
