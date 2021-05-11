import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3SearchPage } from './tab3-search.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3SearchPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3SearchPageRoutingModule {}
