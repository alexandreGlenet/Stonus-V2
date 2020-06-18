import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoneUpdatePageRoutingModule } from './stone-update-routing.module';

import { StoneUpdatePage } from './stone-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoneUpdatePageRoutingModule
  ],
  declarations: [StoneUpdatePage]
})
export class StoneUpdatePageModule {}
