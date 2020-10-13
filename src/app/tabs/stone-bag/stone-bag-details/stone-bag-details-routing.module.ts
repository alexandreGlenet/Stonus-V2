import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoneBagDetailsPage } from './stone-bag-details.page';

const routes: Routes = [
  {
    path: '',
    component: StoneBagDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoneBagDetailsPageRoutingModule {}
