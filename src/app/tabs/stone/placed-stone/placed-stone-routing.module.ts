import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PlacedStonePage } from "./placed-stone.page";

const routes: Routes = [
	{
		path: "",
		component: PlacedStonePage,
	},
	{
		path: "stones/:id",
		loadChildren: () =>
			import("./placed-selected-stone/placed-selected-stone.module").then(
				(m) => m.PlacedSelectedStonePageModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PlacedStonePageRoutingModule {}
