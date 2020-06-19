import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PlacedSelectedStonePageRoutingModule } from "./placed-selected-stone-routing.module";

import { PlacedSelectedStonePage } from "./placed-selected-stone.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PlacedSelectedStonePageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [PlacedSelectedStonePage],
})
export class PlacedSelectedStonePageModule {}
