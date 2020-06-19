import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PlacedStonePageRoutingModule } from "./placed-stone-routing.module";

import { PlacedStonePage } from "./placed-stone.page";
import { Camera } from "@ionic-native/camera/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PlacedStonePageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [PlacedStonePage],
	providers: [Camera, FileTransfer],
})
export class PlacedStonePageModule {}
