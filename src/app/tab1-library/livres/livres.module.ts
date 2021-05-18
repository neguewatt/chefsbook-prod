import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivresPageRoutingModule } from './livres-routing.module';

import { LivresPage } from './livres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivresPageRoutingModule
  ],
  declarations: [LivresPage]
})
export class LivresPageModule {}
