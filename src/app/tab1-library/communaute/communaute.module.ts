import { ShopPage } from './shop/shop.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommunautePageRoutingModule } from './communaute-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunautePageRoutingModule,
  ],
  declarations: []
})
export class CommunautePageModule {}
