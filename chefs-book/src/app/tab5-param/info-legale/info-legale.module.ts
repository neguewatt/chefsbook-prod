import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoLegalePageRoutingModule } from './info-legale-routing.module';

import { InfoLegalePage } from './info-legale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoLegalePageRoutingModule
  ],
  declarations: [InfoLegalePage]
})
export class InfoLegalePageModule {}
