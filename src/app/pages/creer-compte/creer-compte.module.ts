import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreerUtilisateurPageRoutingModule } from './creer-compte-routing.module';

import { CreerUtilisateurPage } from './creer-compte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreerUtilisateurPageRoutingModule
  ],
  declarations: [CreerUtilisateurPage]
})
export class CreerUtilisateurPageModule {}
