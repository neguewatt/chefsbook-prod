import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FtByLivrePageRoutingModule } from './ft-by-livre-routing.module';

import { FtByLivrePage } from './ft-by-livre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FtByLivrePageRoutingModule
  ],
  declarations: [FtByLivrePage]
})
export class FtByLivrePageModule {}
