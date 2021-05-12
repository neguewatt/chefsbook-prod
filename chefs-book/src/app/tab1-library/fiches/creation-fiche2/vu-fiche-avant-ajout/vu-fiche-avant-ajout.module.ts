import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VuFicheAvantAjoutPageRoutingModule } from './vu-fiche-avant-ajout-routing.module';

import { VuFicheAvantAjoutPage } from './vu-fiche-avant-ajout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VuFicheAvantAjoutPageRoutingModule
  ],
  declarations: [VuFicheAvantAjoutPage]
})
export class VuFicheAvantAjoutPageModule {}
