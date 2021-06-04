import { AffichageIngredients } from './../../../models/affichageIngredients';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/service/auth-firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.page.html',
  styleUrls: ['./fiche.page.scss'],
})
export class FichePage implements OnInit {

  mykey: string;
  myTable: AffichageIngredients;
  tableau: string;

  constructor(private dataService: AuthFirebaseService) { }

  ngOnInit() {
    this.getOrdreTableau();
  }

  getOrdreTableau(){
    this.dataService.getOrdreTableauFT().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      this.myTable = res[0];
      this.mykey = res[0].key;
     //  console.log(res[0].key);
      if(res[0].natureUniteQuantite){
        this.tableau = 'tableau1';
      }else{
        this.tableau = 'tableau2';
      }
    });
  }


  onChange(value: string){
    if(value ===  'tableau1'){
      this.myTable.natureUniteQuantite = true;
      this.myTable.quantiteUniteNature = false;
    }else {
      this.myTable.natureUniteQuantite = false;
      this.myTable.quantiteUniteNature = true;
    }

    this.update();
  }

  update(){
    this.dataService.updateTableauFiche(this.mykey, this.myTable);
  }


}
