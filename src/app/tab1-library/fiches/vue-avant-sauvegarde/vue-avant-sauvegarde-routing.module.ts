import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VueAvantSauvegardePage } from './vue-avant-sauvegarde.page';

const routes: Routes = [
  {
    path: '',
    component: VueAvantSauvegardePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VueAvantSauvegardePageRoutingModule {}
