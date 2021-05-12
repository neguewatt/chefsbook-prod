import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepaPage } from './prepa.page';

const routes: Routes = [
  {
    path: '',
    component: PrepaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrepaPageRoutingModule {}
