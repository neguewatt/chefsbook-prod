import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunautePage } from './communaute.page';

const routes: Routes = [
  {
    path: '',
    component: CommunautePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunautePageRoutingModule {}
