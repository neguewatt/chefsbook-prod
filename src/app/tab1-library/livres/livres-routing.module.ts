import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivresPage } from './livres.page';

const routes: Routes = [
  {
    path: '',
    component: LivresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivresPageRoutingModule {}
