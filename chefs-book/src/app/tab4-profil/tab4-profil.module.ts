import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-profil-routing.module';

import { Tab4ProfilPage } from './tab4-profil.page';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule
  ],
  declarations: [Tab4ProfilPage, ProfilComponent]
})
export class Tab4ProfilPageModule {}
