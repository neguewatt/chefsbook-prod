import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepaPageRoutingModule } from './prepa-routing.module';

import { PrepaPage } from './prepa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PrepaPageRoutingModule
  ],
  declarations: []
})
export class PrepaPageModule {}
