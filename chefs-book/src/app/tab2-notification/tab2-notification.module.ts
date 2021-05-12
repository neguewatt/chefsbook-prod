import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2NotificationPage } from './tab2-notification.page';

import { Tab2NotificationPageRoutingModule } from './tab2-notification-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2NotificationPageRoutingModule
  ],
  declarations: [Tab2NotificationPage]
})
export class Tab2NotificationPageModule {}
