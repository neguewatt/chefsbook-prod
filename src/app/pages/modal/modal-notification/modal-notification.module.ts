import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNotificationPageRoutingModule } from './modal-notification-routing.module';

import { ModalNotificationPage } from './modal-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNotificationPageRoutingModule
  ],
  declarations: [ModalNotificationPage]
})
export class ModalNotificationPageModule {}
