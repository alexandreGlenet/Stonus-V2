import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoneFoundPage } from './stone-found.page';

const routes: Routes = [
  {
    path: '',
    component: StoneFoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoneFoundPageRoutingModule {}
