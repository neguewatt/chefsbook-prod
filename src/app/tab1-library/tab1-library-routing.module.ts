import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1LibraryPage } from './tab1-library.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1LibraryPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1LibraryPageRoutingModule {}
