import { Component, OnInit, Sanitizer } from "@angular/core";
import { SegmentChangeEventDetail } from "@ionic/core";
import { ApiService } from "src/app/services/api.service";
import {
	LoadingController,
	ToastController,
	AlertController,
} from "@ionic/angular";
// import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
// const { Camera } = Plugins;

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
	FileTransfer,
	FileUploadOptions,
	FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file";

import * as L from "leaflet";
//import { antPath } from "leaflet-ant-path";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { DomSanitizer } from "@angular/platform-browser";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "app-placed-stone",
	templateUrl: "./placed-stone.page.html",
	styleUrls: ["./placed-stone.page.scss"],
})
export class PlacedStonePage implements OnInit {
	//IMAGE
	imageData;
	imageUrl;
	hideImage = true;
	//Formulaire création Stone
	stoneForm: FormGroup;
	onCreate = false;
	//inbag = false;
	//true = true;
	//false = false;
	//PHOTO
	//photoStone = null;
	user_id = this.api.getUserId();
	userStoneLength: any;
	//Map
	map: L.Map;
	newMarker: any;
	address: string[];

	user = null;

	//Segment
	segmentModel = "bag";

	// CONSTRUCTOR
	// -------------------------------------------------------------

	constructor(
		private api: ApiService,
		private loadingCtrl: LoadingController,
		private sanitizer: DomSanitizer,
		private fb: FormBuilder,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private camera: Camera,
		private transfer: FileTransfer
	) {}

	// LIFE CYCLE
	// ----------------------------------------------------------

	ngOnInit() {}

	counter(i: number, u = this.userStoneLength) {
		return new Array(i);
	}

	ionViewWillEnter() {
		//console.log("willEnter");
		let id = this.api.getUserId();
		this.api.getUserContent(id).subscribe((res) => {
			console.log("user: ", res);
			this.user = res;
			if (this.user.photo == null) {
				this.user.photo = "../assets/img/no-image.png";
			} else {
				//this.user.photo = this.user.photo.sizes.medium;
			}
		});
	}

	ionViewDidEnter() {
		console.log("placed-stone: didEnter");
		//console.log(this.map);
	}

	ionViewWillLeave() {
		console.log("placed-stone: willleave");
		//console.log(this.map);
	}

	ionViewDidLeave() {
		//this.map.remove();
		console.log("placed-stone: didleave");
	}

	

	// EVENT ON SEGMENT
	// -----------------------------------------------------------

	onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
		console.log(event.detail);
		if (event.detail.value == "bag") {
			let id = this.api.getUserId();
			this.api.getUserContent(id).subscribe((res) => {
				console.log("user: ", res);
				this.user = res;
				if (this.user.photo == null) {
					this.user.photo = "../assets/img/no-image.png";
				} else {
					//this.user.photo = this.user.photo.sizes.medium;
				}
			});
		} else {
			console.log(event.detail.value);
			this.stoneForm = this.fb.group({
				title: ["", Validators.required],
				description: "",
				user_id: "",
				inbag: "",
			});
		}
	}

	// UTILITAIRES
	// -------------------------------------------------------------------

	async showError(err) {
		const alert = await this.alertCtrl.create({
			header: err.error.code,
			subHeader: err.error.data.status,
			message: err.error.message,
			buttons: ["OK"],
		});
		await alert.present();
	}
}
