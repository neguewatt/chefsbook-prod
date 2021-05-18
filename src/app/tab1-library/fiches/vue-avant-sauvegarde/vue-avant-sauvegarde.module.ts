import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VueAvantSauvegardePageRoutingModule } from './vue-avant-sauvegarde-routing.module';

import { VueAvantSauvegardePage } from './vue-avant-sauvegarde.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VueAvantSauvegardePageRoutingModule
  ],
  declarations: [VueAvantSauvegardePage]
})
export class VueAvantSauvegardePageModule {}
