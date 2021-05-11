import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartagerModalPage } from './partager-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PartagerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartagerModalPageRoutingModule {}
