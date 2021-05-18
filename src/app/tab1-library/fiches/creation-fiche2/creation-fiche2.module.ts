import { PlatPage } from './plat/plat.page';
import { PrepaPage } from './prepa/prepa.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreationFiche2PageRoutingModule } from './creation-fiche2-routing.module';

import { CreationFiche2Page } from './creation-fiche2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreationFiche2PageRoutingModule
  ],
  declarations: [CreationFiche2Page, PrepaPage, PlatPage]
})
export class CreationFiche2PageModule {}
