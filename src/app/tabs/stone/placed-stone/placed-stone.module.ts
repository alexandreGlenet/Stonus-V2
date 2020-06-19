import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacedStonePageRoutingModule } from './placed-stone-routing.module';

import { PlacedStonePage } from './placed-stone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacedStonePageRoutingModule
  ],
  declarations: [PlacedStonePage]
})
export class PlacedStonePageModule {}
