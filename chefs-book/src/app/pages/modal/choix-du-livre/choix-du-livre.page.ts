import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Livres } from 'src/app/models/livres';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';

@Component({
  selector: 'app-choix-du-livre',
  templateUrl: './choix-du-livre.page.html',
  styleUrls: ['./choix-du-livre.page.scss'],
})
export class ChoixDuLivrePage implements OnInit {
  choixLivre: Livres;
  livres: Livres[] = [];

  constructor(private dataService: AuthFirebaseService,
    private modalController: ModalController) { 
      this.livres = this.dataService.livresPersoListe; 
    }

  ngOnInit() {
    console.log(this.livres);
    
  }

  async addLivre() {
    console.log('choix livre: ', this.choixLivre);
    await this.modalController.dismiss(this.choixLivre);
  }

  async cancel() {
    await this.modalController.dismiss();
  }

}
