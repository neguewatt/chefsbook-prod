import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'creer-compte', loadChildren: () => import('./pages/creer-compte/creer-compte.module').then(m => m.CreerUtilisateurPageModule)
  },
  {
    path: 'chargement',
    loadChildren: () => import('./pages/modal/chargement/chargement.module').then(m => m.ChargementPageModule)
  },
  {
    path: 'view-preparation',
    loadChildren: () => import('./tab1-library/fiches/view-preparation/view-preparation.module').then(m => m.ViewPreparationPageModule)
  },
  {
    path: 'view-plat',
    loadChildren: () => import('./tab1-library/fiches/view-plat/view-plat.module').then( m => m.ViewPlatPageModule)
  },
  {
    path: 'creation-fiche2',
    loadChildren: () => import('./tab1-library/fiches/creation-fiche2/creation-fiche2.module').then( m => m.CreationFiche2PageModule)
  },
  {
    path: 'sauvegarde-plat',
    loadChildren: () => import('./tab1-library/fiches/creation-fiche2/sauvegarde-plat/sauvegarde-plat.module')
    .then( m => m.SauvegardePlatPageModule)
  },
  {
    path: 'ajout-produit',
    loadChildren: () => import('./pages/modal/ajout-produit/ajout-produit.module').then( m => m.AjoutProduitPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
