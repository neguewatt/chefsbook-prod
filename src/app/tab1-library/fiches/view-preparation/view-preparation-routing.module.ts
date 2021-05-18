import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPreparationPage } from './view-preparation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPreparationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPreparationPageRoutingModule {}
