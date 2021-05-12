import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5ParamPageRoutingModule } from './tab5-param-routing.module';

import { Tab5ParamPage } from './tab5-param.page';
import { ParametreComponent } from './parametre/parametre.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5ParamPageRoutingModule
  ],
  declarations: [Tab5ParamPage, ParametreComponent]
})
export class Tab5ParamPageModule {}
