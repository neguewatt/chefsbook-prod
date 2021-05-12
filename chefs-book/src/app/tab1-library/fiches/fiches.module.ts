import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichesPageRoutingModule } from './fiches-routing.module';

import { FichesPage } from './fiches.page';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PartagerModalPageModule } from 'src/app/pages/modal/partager-modal/partager-modal.module';
import { IngredientRefModalPageModule } from 'src/app/pages/modal/ingredient-ref-modal/ingredient-ref-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartagerModalPageModule,
    IngredientRefModalPageModule,
    FichesPageRoutingModule,
  //  Ng2SearchPipeModule
  ],
  declarations: [FichesPage]
})
export class FichesPageModule {}
