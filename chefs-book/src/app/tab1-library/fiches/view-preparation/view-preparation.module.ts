import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPreparationPageRoutingModule } from './view-preparation-routing.module';

import { ViewPreparationPage } from './view-preparation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPreparationPageRoutingModule
  ],
  declarations: [ViewPreparationPage]
})
export class ViewPreparationPageModule {}
