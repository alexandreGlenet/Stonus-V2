import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PagesPage } from "./pages.page";
import { AuthentifictionGuard } from "../authentification/authentifiction.guard";

const routes: Routes = [
	{
		path: "",
		component: PagesPage,
		canLoad: [AuthentifictionGuard],
	},
	{
		path: "placed-stone",
		loadChildren: () =>
			import("./placed-stone/placed-stone.module").then(
				(m) => m.PlacedStonePageModule
			),
		canLoad: [AuthentifictionGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesPageRoutingModule {}
