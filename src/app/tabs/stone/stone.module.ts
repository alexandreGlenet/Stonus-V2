import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StonePageRoutingModule } from "./stone-routing.module";

//import { HereMapComponent } from "../../components/here-map/here-map.component";

import { StonePage } from "./stone.page";
import { Camera } from "@ionic-native/camera/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		StonePageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [StonePage],
	providers: [Camera, FileTransfer],
})
export class StonePageModule {}
