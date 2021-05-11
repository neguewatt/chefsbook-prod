import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1-library',
        loadChildren: () => import('../tab1-library/tab1-library.module').then(m => m.Tab1LibraryPageModule)
      },
      {
        path: 'tab2-notification',
        loadChildren: () => import('../tab2-notification/tab2-notification.module').then(m => m.Tab2NotificationPageModule)
      },
      {
        path: 'tab3-search',
        loadChildren: () => import('../tab3-search/tab3-search.module').then(m => m.Tab3SearchPageModule)
      },
      {
        path: 'tab4-profil',
        loadChildren: () => import('../tab4-profil/tab4-profil.module').then(m => m.Tab4ProfilPageModule)
      },
      {
        path: 'tab5-param',
        loadChildren: () => import('../tab5-param/tab5-param.module').then(m => m.Tab5ParamPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1-library',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1-library',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
