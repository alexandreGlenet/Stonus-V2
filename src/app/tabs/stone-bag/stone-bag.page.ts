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
	selector: "app-stone-bag",
	templateUrl: "./stone-bag.page.html",
	styleUrls: ["./stone-bag.page.scss"],
})
export class StoneBagPage implements OnInit {
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

	//Map
	map: L.Map;
	newMarker: any;
	address: string[];

	user = null;

	//Segment
	segmentModel = "bag";

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

	ngOnInit() {}

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
		console.log("didEnter stone-bag");
		//console.log(this.map);
	}

	ionViewWillLeave() {
		console.log("willleave stone-bag");
		//console.log(this.map);
	}

	ionViewDidLeave() {
		//this.map.remove();
		console.log("didleave stone-bag");
	}

	// async takePicture() {
	// 	const image = await Camera.getPhoto({
	// 		quality: 50,
	// 		allowEditing: true,
	// 		resultType: CameraResultType.Uri,
	// 		source: CameraSource.Camera,
	// 	});
	// 	console.log("image: ", image);

	// 	this.photoStone = this.sanitizer.bypassSecurityTrustResourceUrl(
	// 		image && image.webPath
	// 	);
	// }

	// createStone() {
	// 	//this.onCreate = true;
	// 	this.stoneForm = this.fb.group({
	// 		title: ["", Validators.required],
	// 		description: "",
	// 		user_id: "",
	// 		inbag: "",
	// 	});
	// }

	validateCreateStone() {
		this.onCreate = false;

		this.api
			.validateCreateStone(
				this.stoneForm.value.title,
				this.stoneForm.value.description,
				(this.stoneForm.value.user_id = this.user_id),
				(this.stoneForm.value.inbag = true)
			)
			.subscribe(
				async (res) => {
					const toast = await this.toastCtrl.create({
						message: res["message"],
						duration: 3000,
					});
					toast.present();
				},
				(err) => {
					this.showError(err);
				}
			);
	}

	async showError(err) {
		const alert = await this.alertCtrl.create({
			header: err.error.code,
			subHeader: err.error.data.status,
			message: err.error.message,
			buttons: ["OK"],
		});
		await alert.present();
	}

	getPhoto() {
		const options: CameraOptions = {
			quality: 70,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: this.camera.EncodingType.PNG,
			correctOrientation: true,
			mediaType: this.camera.MediaType.PICTURE,
			targetWidth: 300,
			targetHeight: 300,
		};

		this.camera.getPicture(options).then(
			(imageData) => {
				//this.updateUserPicture(imageData);
				this.imageData = imageData;
				this.imageUrl = "data:image/png;base64," + imageData;
				this.hideImage = false;
			},
			(error) => {
				console.log("Error taking picture: " + JSON.stringify(error));
			}
		);
	}

	uploadPhoto() {
		let t = this.transfer.create();
	}

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
}
