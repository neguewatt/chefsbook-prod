import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientRefModalPageRoutingModule } from './ingredient-ref-modal-routing.module';

import { IngredientRefModalPage } from './ingredient-ref-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientRefModalPageRoutingModule
  ],
  declarations: [IngredientRefModalPage]
})
export class IngredientRefModalPageModule {}
