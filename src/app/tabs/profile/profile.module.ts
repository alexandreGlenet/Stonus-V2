import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilePageRoutingModule } from "./profile-routing.module";

import { ProfilePage } from "./profile.page";
import { ChangeAvatarPage } from "./change-avatar/change-avatar.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ProfilePageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [ProfilePage, ChangeAvatarPage],
	entryComponents: [ChangeAvatarPage],
})
export class ProfilePageModule {}
