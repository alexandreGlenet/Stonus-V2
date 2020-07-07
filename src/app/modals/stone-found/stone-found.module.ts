import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoneFoundPageRoutingModule } from './stone-found-routing.module';

import { StoneFoundPage } from './stone-found.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoneFoundPageRoutingModule
  ],
  declarations: [StoneFoundPage]
})
export class StoneFoundPageModule {}
