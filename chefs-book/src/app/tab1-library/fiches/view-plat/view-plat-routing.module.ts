import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPlatPage } from './view-plat.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPlatPageRoutingModule {}
