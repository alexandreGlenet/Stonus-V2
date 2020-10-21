import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeAvatarPage } from './change-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeAvatarPageRoutingModule {}
