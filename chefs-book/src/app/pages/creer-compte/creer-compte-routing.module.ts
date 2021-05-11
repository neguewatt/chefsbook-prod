import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreerUtilisateurPage } from './creer-compte.page';

const routes: Routes = [
  {
    path: '',
    component: CreerUtilisateurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreerUtilisateurPageRoutingModule {}
