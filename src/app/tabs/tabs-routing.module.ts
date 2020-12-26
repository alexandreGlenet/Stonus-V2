import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";
import { AuthentifictionGuard } from "../authentification/authentifiction.guard";

const routes: Routes = [
	{
		path: "tabs",
		component: TabsPage,
		children: [
			{
				path: "stone",
				loadChildren: () =>
					import("./stone/stone.module").then((m) => m.StonePageModule),
				//ici pour empecher le rechargement de AuthentificationGuard
				 canLoad: [AuthentifictionGuard],
			},
			{
				path: "stone-bag",
				loadChildren: () =>
					import("./stone-bag/stone-bag.module").then(
						(m) => m.StoneBagPageModule
					),
				//ici pour empecher le rechargement de AuthentificationGuard
				 canLoad: [AuthentifictionGuard],
			},
			{
				path: "profile",
				loadChildren: () =>
					import("./profile/profile.module").then((m) => m.ProfilePageModule),
				//ici pour empecher le rechargement de AuthentificationGuard
				 canLoad: [AuthentifictionGuard],
			},
			{
				path: "", // redirection pour les cas ou places/tabs
				redirectTo: "tabs/stone",
				pathMatch: "full",
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TabsPageRoutingModule {}
