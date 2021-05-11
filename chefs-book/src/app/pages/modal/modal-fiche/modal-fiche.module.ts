import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFichePageRoutingModule } from './modal-fiche-routing.module';

import { ModalFichePage } from './modal-fiche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFichePageRoutingModule
  ],
  declarations: [ModalFichePage]
})
export class ModalFichePageModule {}
