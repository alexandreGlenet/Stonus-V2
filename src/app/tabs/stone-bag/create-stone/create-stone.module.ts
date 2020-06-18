import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStonePageRoutingModule } from './create-stone-routing.module';

import { CreateStonePage } from './create-stone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStonePageRoutingModule
  ],
  declarations: [CreateStonePage]
})
export class CreateStonePageModule {}
