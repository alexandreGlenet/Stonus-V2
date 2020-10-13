import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StoneBagPage } from "./stone-bag.page";

const routes: Routes = [
	{
		path: "",
		component: StoneBagPage,
	},
	{
		path: "create-stone",
		loadChildren: () =>
			import("./create-stone/create-stone.module").then(
				(m) => m.CreateStonePageModule
			),
	},
	{
		path: "stones/:id",
		loadChildren: () =>
			import("./stone-update/stone-update.module").then(
				(m) => m.StoneUpdatePageModule
			),
	},
	{
		path: "stone-bag-details/:id",
		loadChildren: () =>
			import("./stone-bag-details/stone-bag-details.module").then(
				(m) => m.StoneBagDetailsPageModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StoneBagPageRoutingModule {}
