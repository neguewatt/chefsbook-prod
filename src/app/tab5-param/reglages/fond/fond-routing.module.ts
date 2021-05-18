import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FondPage } from './fond.page';

const routes: Routes = [
  {
    path: '',
    component: FondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FondPageRoutingModule {}
