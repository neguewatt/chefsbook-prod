import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreationLivresPageRoutingModule } from './creation-livres-routing.module';

import { CreationLivresPage } from './creation-livres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreationLivresPageRoutingModule
  ],
  declarations: [CreationLivresPage]
})
export class CreationLivresPageModule {}
