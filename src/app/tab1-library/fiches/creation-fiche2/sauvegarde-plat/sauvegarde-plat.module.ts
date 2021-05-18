import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SauvegardePlatPageRoutingModule } from './sauvegarde-plat-routing.module';

import { SauvegardePlatPage } from './sauvegarde-plat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SauvegardePlatPageRoutingModule
  ],
  declarations: [SauvegardePlatPage]
})
export class SauvegardePlatPageModule {}
