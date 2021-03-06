import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthentifictionGuard } from "./authentification/authentifiction.guard";

const routes: Routes = [
	{
		path: "",
		redirectTo: "tabs/stone",
		pathMatch: "full",
	},
	{
		path: "",
		loadChildren: () =>
			import("./tabs/tabs.module").then((m) => m.TabsPageModule),
		//canLoad: [AuthentifictionGuard], a priori pas celui-ci a enlever pour éviter le rechargement de auth mais dans tabs-routing.module
	},
	{
		path: "authentification",
		loadChildren: () =>
			import("./authentification/authentification.module").then(
				(m) => m.AuthentificationPageModule
			),
	},
	{
		path: "placed-stone",
		loadChildren: () =>
			import("./pages/placed-stone/placed-stone.module").then(
				(m) => m.PlacedStonePageModule
			),
	},
	{
		path: "pages",
		loadChildren: () =>
			import("./pages/pages.module").then((m) => m.PagesPageModule),
	},
	{
		path: "stone-found",
		loadChildren: () =>
			import("./modals/stone-found/stone-found.module").then(
				(m) => m.StoneFoundPageModule
			),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
