import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientRefModalPage } from './ingredient-ref-modal.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientRefModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientRefModalPageRoutingModule {}
