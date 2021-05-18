import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPlatPageRoutingModule } from './view-plat-routing.module';

import { ViewPlatPage } from './view-plat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPlatPageRoutingModule
  ],
  declarations: [ViewPlatPage]
})
export class ViewPlatPageModule {}
