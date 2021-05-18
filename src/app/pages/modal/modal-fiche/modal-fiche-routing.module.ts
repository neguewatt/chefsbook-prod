import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFichePage } from './modal-fiche.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFichePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFichePageRoutingModule {}
