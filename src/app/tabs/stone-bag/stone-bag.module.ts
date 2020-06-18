import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StoneBagPageRoutingModule } from "./stone-bag-routing.module";

import { StoneBagPage } from "./stone-bag.page";
//import { Camera } from "@capacitor/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
	FileTransfer,
	FileUploadOptions,
	FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		StoneBagPageRoutingModule,
		ReactiveFormsModule,
	],
	providers: [Camera, FileTransfer],
	declarations: [StoneBagPage],
})
export class StoneBagPageModule {}
