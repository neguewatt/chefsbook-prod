import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNotificationPage } from './modal-notification.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNotificationPageRoutingModule {}
