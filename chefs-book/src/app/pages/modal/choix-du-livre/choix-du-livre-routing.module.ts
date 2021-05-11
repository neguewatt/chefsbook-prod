import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoixDuLivrePage } from './choix-du-livre.page';

const routes: Routes = [
  {
    path: '',
    component: ChoixDuLivrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoixDuLivrePageRoutingModule {}
