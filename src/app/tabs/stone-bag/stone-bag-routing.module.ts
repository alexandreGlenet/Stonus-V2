import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoneBagPage } from './stone-bag.page';

const routes: Routes = [
  {
    path: '',
    component: StoneBagPage
  },
  {
    path: 'create-stone',
    loadChildren: () => import('./create-stone/create-stone.module').then( m => m.CreateStonePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoneBagPageRoutingModule {}
