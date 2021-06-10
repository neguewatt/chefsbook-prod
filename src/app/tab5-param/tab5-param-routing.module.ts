import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab5ParamPage } from './tab5-param.page';

const routes: Routes = [
  {
    path: '',
    component: Tab5ParamPage
  },
  {
    path: 'assistance',
    loadChildren: () => import('./assistance/assistance.module').then(m => m.AssistancePageModule)
  },
  {
    path: 'info-legale',
    loadChildren: () => import('./info-legale/info-legale.module').then(m => m.InfoLegalePageModule)
  },
  {
    path: 'reglages',
    loadChildren: () => import('./reglages/reglages.module').then(m => m.ReglagesPageModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./compte/compte.module').then(m => m.ComptePageModule)
  },
  {
    path: '',
    redirectTo: '/tabs/tab5-param',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab5ParamPageRoutingModule { }
