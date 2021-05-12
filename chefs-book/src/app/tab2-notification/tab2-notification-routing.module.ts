import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2NotificationPage } from './tab2-notification.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2NotificationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2NotificationPageRoutingModule {}
