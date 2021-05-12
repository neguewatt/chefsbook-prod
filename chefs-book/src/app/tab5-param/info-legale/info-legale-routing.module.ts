import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoLegalePage } from './info-legale.page';

const routes: Routes = [
  {
    path: '',
    component: InfoLegalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoLegalePageRoutingModule {}
