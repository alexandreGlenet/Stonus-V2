import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StonePageRoutingModule } from "./stone-routing.module";

//import { HereMapComponent } from "../../components/here-map/here-map.component";

import { StonePage } from "./stone.page";
import { PlacedStoneComponent } from "./placed-stone/placed-stone.component";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, StonePageRoutingModule],
	declarations: [StonePage, PlacedStoneComponent],
	entryComponents: [PlacedStoneComponent],
})
export class StonePageModule {}
