import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoneUpdatePage } from './stone-update.page';

const routes: Routes = [
  {
    path: '',
    component: StoneUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoneUpdatePageRoutingModule {}
