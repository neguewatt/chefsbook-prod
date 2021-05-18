import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommunautePageRoutingModule } from './communaute-routing.module';
import { CommunautePage } from './communaute.page';
import { FolderPage } from './folder/folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunautePageRoutingModule
  ],
  declarations: [CommunautePage, FolderPage]
})
export class CommunautePageModule {}
