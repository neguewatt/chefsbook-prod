import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VuFicheAvantAjoutPage } from './vu-fiche-avant-ajout.page';

const routes: Routes = [
  {
    path: '',
    component: VuFicheAvantAjoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VuFicheAvantAjoutPageRoutingModule {}
