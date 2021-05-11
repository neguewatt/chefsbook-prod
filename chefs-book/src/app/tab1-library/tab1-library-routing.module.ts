import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1LibraryPage } from './tab1-library.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1LibraryPage,
  },
  {
    path: 'communaute',
    loadChildren: () => import('./communaute/communaute.module').then( m => m.CommunautePageModule)
  },
  {
    path: 'fiches',
    loadChildren: () => import('./fiches/fiches.module').then( m => m.FichesPageModule)
  },
  {
    path: 'livres',
    loadChildren: () => import('./livres/livres.module').then( m => m.LivresPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1LibraryPageRoutingModule {}
