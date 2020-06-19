import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacedSelectedStonePage } from './placed-selected-stone.page';

const routes: Routes = [
  {
    path: '',
    component: PlacedSelectedStonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacedSelectedStonePageRoutingModule {}
