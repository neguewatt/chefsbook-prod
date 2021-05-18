import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartagerModalPageRoutingModule } from './partager-modal-routing.module';

import { PartagerModalPage } from './partager-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartagerModalPageRoutingModule
  ],
  declarations: [PartagerModalPage]
})
export class PartagerModalPageModule {}
