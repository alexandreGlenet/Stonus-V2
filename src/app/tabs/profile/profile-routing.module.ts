import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'profile-lists',
    loadChildren: () => import('./profile-lists/profile-lists.module').then( m => m.ProfileListsPageModule)
  },
  {
    path: 'change-avatar',
    loadChildren: () => import('./change-avatar/change-avatar.module').then( m => m.ChangeAvatarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
