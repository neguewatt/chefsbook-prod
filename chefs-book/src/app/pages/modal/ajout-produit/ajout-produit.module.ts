import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutProduitPageRoutingModule } from './ajout-produit-routing.module';

import { AjoutProduitPage } from './ajout-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutProduitPageRoutingModule
  ],
  declarations: [AjoutProduitPage]
})
export class AjoutProduitPageModule {}
