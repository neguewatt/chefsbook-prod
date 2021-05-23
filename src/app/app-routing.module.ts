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
    path: 'creation-livres',
    loadChildren: () => import('./tab1-library/livres/creation-livres/creation-livres.module').then( m => m.CreationLivresPageModule)
  },
  {
    path: 'ft-by-livre',
    loadChildren: () => import('./tab1-library/livres/ft-by-livre/ft-by-livre.module').then( m => m.FtByLivrePageModule)
  },
  {
    path: 'vu-fiche-avant-ajout',
    loadChildren: () => import('./tab1-library/fiches/creation-fiche2/vu-fiche-avant-ajout/vu-fiche-avant-ajout.module').
    then( m => m.VuFicheAvantAjoutPageModule)
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
  },
  {
    path: 'partager-modal',
    loadChildren: () => import('./pages/modal/partager-modal/partager-modal.module').then( m => m.PartagerModalPageModule)
  },
  {
    path: 'modal-fiche',
    loadChildren: () => import('./pages/modal/modal-fiche/modal-fiche.module').then( m => m.ModalFichePageModule)
  },
  {
    path: 'ingredient-ref-modal',
    loadChildren: () => import('./pages/modal/ingredient-ref-modal/ingredient-ref-modal.module').then( m => m.IngredientRefModalPageModule)
  },
  {
    path: 'vue-avant-sauvegarde',
    loadChildren: () => import('./tab1-library/fiches/vue-avant-sauvegarde/vue-avant-sauvegarde.module')
    .then( m => m.VueAvantSauvegardePageModule)
  },
  {
    path: 'choix-du-livre',
    loadChildren: () => import('./pages/modal/choix-du-livre/choix-du-livre.module').then( m => m.ChoixDuLivrePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
