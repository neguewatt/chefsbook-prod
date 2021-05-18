import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReglagesPage } from './reglages.page';

const routes: Routes = [
  {
    path: '',
    component: ReglagesPage
  },
  {
    path: 'ecran',
    loadChildren: () => import('./ecran/ecran.module').then( m => m.EcranPageModule)
  },
  {
    path: 'langue',
    loadChildren: () => import('./langue/langue.module').then( m => m.LanguePageModule)
  },
  {
    path: 'fond',
    loadChildren: () => import('./fond/fond.module').then( m => m.FondPageModule)
  },
  {
    path: 'fiche',
    loadChildren: () => import('./fiche/fiche.module').then( m => m.FichePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglagesPageRoutingModule {}
