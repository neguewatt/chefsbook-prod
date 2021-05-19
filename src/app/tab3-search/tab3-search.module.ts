import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3SearchPage } from './tab3-search.page';

import { Tab3SearchPageRoutingModule } from './tab3-search-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3SearchPage }]),
    Tab3SearchPageRoutingModule,
  ],
  declarations: [Tab3SearchPage]
})
export class Tab3SearchPageModule {}
