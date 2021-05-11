import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatPage } from './plat.page';

const routes: Routes = [
  {
    path: '',
    component: PlatPage
  },
  {
    path: 'vu-fiche-avant-ajout',
    loadChildren: () => import('../vu-fiche-avant-ajout/vu-fiche-avant-ajout.module').then( m => m.VuFicheAvantAjoutPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatPageRoutingModule {}
