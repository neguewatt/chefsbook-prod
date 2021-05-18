import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivresPage } from './livres.page';

const routes: Routes = [
  {
    path: '',
    component: LivresPage
  },
  {
    path: 'creation-livres',
    loadChildren: () => import('./creation-livres/creation-livres.module').then( m => m.CreationLivresPageModule)
  },
  {
    path: 'ft-by-livre',
    loadChildren: () => import('./ft-by-livre/ft-by-livre.module').then( m => m.FtByLivrePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivresPageRoutingModule {}
