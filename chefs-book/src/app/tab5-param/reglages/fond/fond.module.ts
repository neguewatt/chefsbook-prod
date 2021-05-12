import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FondPageRoutingModule } from './fond-routing.module';

import { FondPage } from './fond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FondPageRoutingModule
  ],
  declarations: [FondPage]
})
export class FondPageModule {}
