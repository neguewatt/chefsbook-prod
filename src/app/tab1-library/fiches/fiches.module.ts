import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichesPageRoutingModule } from './fiches-routing.module';

import { FichesPage } from './fiches.page';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PartagerModalPageModule } from 'src/app/pages/modal/partager-modal/partager-modal.module';
import { IngredientRefModalPageModule } from 'src/app/pages/modal/ingredient-ref-modal/ingredient-ref-modal.module';
import { ModalFichePage } from 'src/app/pages/modal/modal-fiche/modal-fiche.page';
import { AjoutProduitPage } from 'src/app/pages/modal/ajout-produit/ajout-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichesPageRoutingModule,
  //  Ng2SearchPipeModule
  ],
  declarations: []
})
export class FichesPageModule {}
