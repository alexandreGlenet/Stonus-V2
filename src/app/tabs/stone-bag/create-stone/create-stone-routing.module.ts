import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStonePage } from './create-stone.page';

const routes: Routes = [
  {
    path: '',
    component: CreateStonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStonePageRoutingModule {}
