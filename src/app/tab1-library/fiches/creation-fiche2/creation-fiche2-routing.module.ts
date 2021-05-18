import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreationFiche2Page } from './creation-fiche2.page';

const routes: Routes = [
  {
    path: '',
    component: CreationFiche2Page
  },
  {
    path: 'prepa',
    loadChildren: () => import('./prepa/prepa.module').then( m => m.PrepaPageModule)
  },
  {
    path: 'plat',
    loadChildren: () => import('./plat/plat.module').then( m => m.PlatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreationFiche2PageRoutingModule {}
