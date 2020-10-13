import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoneBagDetailsPageRoutingModule } from './stone-bag-details-routing.module';

import { StoneBagDetailsPage } from './stone-bag-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoneBagDetailsPageRoutingModule
  ],
  declarations: [StoneBagDetailsPage]
})
export class StoneBagDetailsPageModule {}
