import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoixDuLivrePageRoutingModule } from './choix-du-livre-routing.module';

import { ChoixDuLivrePage } from './choix-du-livre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoixDuLivrePageRoutingModule
  ],
  declarations: [ChoixDuLivrePage]
})
export class ChoixDuLivrePageModule {}
