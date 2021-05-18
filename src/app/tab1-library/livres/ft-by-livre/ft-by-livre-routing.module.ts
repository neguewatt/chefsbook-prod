import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FtByLivrePage } from './ft-by-livre.page';

const routes: Routes = [
  {
    path: '',
    component: FtByLivrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtByLivrePageRoutingModule {}
