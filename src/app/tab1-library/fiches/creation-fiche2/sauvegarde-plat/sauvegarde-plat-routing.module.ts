import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SauvegardePlatPage } from './sauvegarde-plat.page';

const routes: Routes = [
  {
    path: '',
    component: SauvegardePlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SauvegardePlatPageRoutingModule {}
