import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab4ProfilPage } from './tab4-profil.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4ProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
