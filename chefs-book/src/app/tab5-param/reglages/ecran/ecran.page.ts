import { EcranDefaut } from './../../../models/ecranDefaut';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';

@Component({
  selector: 'app-ecran',
  templateUrl: './ecran.page.html',
  styleUrls: ['./ecran.page.scss'],
})
export class EcranPage implements OnInit {
 
  key: string;
  table: EcranDefaut;
  ecran: string;

  constructor(private dataService: AuthFirebaseService) { }

  ngOnInit() {
    this.getEcranDefaut();
  }

  getEcranDefaut() {
    this.dataService.getEcranDefaut().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      this.table = res[0];
      this.key = res[0].key;
      if (res[0].mesFiches) {
        this.ecran = 'fiches';
      } else if (res[0].mesLivres) {
        this.ecran = 'livres';
      } else if (res[0].communaute) {
        this.ecran = 'communaute';
      } else if (res[0].profil) {
        this.ecran = 'profil';
      } else if (res[0].recherche) {
        this.ecran = 'recherche';
      }
    });
  }


  onChange(value: string) {
    if (value === 'fiches') {
      this.table.mesFiches = true;
      this.table.mesLivres = false;
      this.table.communaute = false;
      this.table.profil = false;
      this.table.recherche = false;
    } else if (value === 'livres') {
      this.table.mesFiches = false;
      this.table.mesLivres = true;
      this.table.communaute = false;
      this.table.profil = false;
      this.table.recherche = false;
    } else if (value === 'communaute') {
      this.table.mesFiches = false;
      this.table.mesLivres = false;
      this.table.communaute = true;
      this.table.profil = false;
      this.table.recherche = false;
    } else if (value === 'profil') {
      this.table.mesFiches = false;
      this.table.mesLivres = false;
      this.table.communaute = false;
      this.table.profil = true;
      this.table.recherche = false;
    } else if (value === 'recherche') {
      this.table.mesFiches = false;
      this.table.mesLivres = false;
      this.table.communaute = false;
      this.table.profil = false;
      this.table.recherche = true;
    }
    console.log(this.table);
    this.update();
  }

  update() {
    this.dataService.updateEcranDefaut(this.key, this.table);
  }



}
