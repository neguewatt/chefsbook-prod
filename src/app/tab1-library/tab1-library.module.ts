import { FolderPage } from './communaute/folder/folder.page';
import { ShopPage } from './communaute/shop/shop.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1LibraryPage } from './tab1-library.page';

import { Tab1LibraryPageRoutingModule } from './tab1-library-routing.module';
import { CommunautePage } from './communaute/communaute.page';
import { FichesPage } from './fiches/fiches.page';
import { LivresPage } from './livres/livres.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1LibraryPageRoutingModule,
  ],
  declarations: [Tab1LibraryPage, CommunautePage, FichesPage, LivresPage, ShopPage, FolderPage]
})
export class Tab1LibraryPageModule {}
