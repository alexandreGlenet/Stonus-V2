import { Component, OnInit, Sanitizer } from "@angular/core";
import { SegmentChangeEventDetail } from "@ionic/core";
import { ApiService } from "src/app/services/api.service";
import {
	LoadingController,
	ToastController,
	AlertController,
} from "@ionic/angular";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
// const { Camera } = Plugins;

//import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
// import {
// 	FileTransfer,
// 	FileUploadOptions,
// 	FileTransferObject,
// } from "@ionic-native/file-transfer/ngx";
// import { File } from "@ionic-native/file";

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
	photoStone : any;
	// photoStoneImage : any;
	// photoStoneType = null;
	// photoStoneDataUrl : any;
	// photoStoneFormat : any;
	 photoStoneBlob : any;
	// photoStoneFile : any;
	img1 : any;
	user_id = this.api.getUserId();

	//Map
	map: L.Map;
	newMarker: any;
	address: string[];

	userStoneLength: any;

	user = null;

	//Segment
	segmentModel = "bag";
	createurName : any;
	//Loic
	uploaded_photo : any;

	// CONSTRUCTOR
	// -------------------------------------------------------------

	constructor(
		private api: ApiService,
		private loadingCtrl: LoadingController,
		private sanitizer: DomSanitizer,
		private fb: FormBuilder,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		//private camera: Camera,
		//private transfer: FileTransfer
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

	// PHOTO - CAMERA - FILE
	// ----------------------------------------------------------

	// getPhoto() {
	// 	const options: CameraOptions = {
	// 		quality: 70,
	// 		destinationType: this.camera.DestinationType.DATA_URL,
	// 		sourceType: this.camera.PictureSourceType.CAMERA,
	// 		allowEdit: false,
	// 		encodingType: this.camera.EncodingType.PNG,
	// 		correctOrientation: true,
	// 		mediaType: this.camera.MediaType.PICTURE,
	// 		targetWidth: 300,
	// 		targetHeight: 300,
	// 	};

	// 	this.camera.getPicture(options).then(
	// 		(imageData) => {
	// 			//this.updateUserPicture(imageData);
	// 			this.imageData = imageData;
	// 			this.imageUrl = "data:image/png;base64," + imageData;
	// 			this.hideImage = false;
	// 		},
	// 		(error) => {
	// 			console.log("Error taking picture: " + JSON.stringify(error));
	// 		}
	// 	);
	// }

	// uploadPhoto() {
	// 	let t = this.transfer.create();
	// }

	// async takePicture() {
	// 	const { Camera } = Plugins;
	// 	const image = await Camera.getPhoto({
	// 		quality: 50,
	// 		allowEditing: true,
	// 		resultType: CameraResultType.Uri,
	// 		source: CameraSource.Camera,
	// 	});
	// 	console.log("image: ", image);

	// 	// permet de pouvoir afficher la photo en direct
	// 	this.photoStone = this.sanitizer.bypassSecurityTrustResourceUrl(
	// 		image && image.webPath
	// 	);

	// 	this.photoStoneType = image;
	// 	console.log("photoStone: ", this.photoStone);
	// 	console.log("photoStoneBlob: ", image);
		

	// 	// créer un blob a partir de l'URI
	// 	let blob = await fetch(image.webPath).then(r => r.blob());
	// 	// ---------------------------------------
	// 	// Test dataUrl To File ---
	// 	this.photoStoneImage = image; // je peux le récupérer dans validatecreateStone
	// 	this.photoStoneDataUrl = image.dataUrl; // je peux le récupérer dans validatecreateStone
	// 	this.photoStoneFormat = image.format; 
	// 	this.photoStoneBlob = image;
	// 	this.photoStoneFile = new File([blob], image.webPath, {type: "image/"+this.photoStoneFormat, lastModified: Date.now()});
	// 	//filename = name+format
	// 	console.log("PhotoFile :", this.photoStoneFile);

	// 	//----------------------------------------
		
	// 	// ***********************
	// 	// créer un blob
	// 	//var blob = new Blob(byteArrays, { type: jpeg });
	// 	// ***********************
		
	// 	// ***********************
	// 	// convertir un blob en File    source : https://stackoverflow.com/questions/27553617/convert-blob-to-file?rq=1#:~:text=It's%20easy%3A,%3A%20contentType%2C%20lastModified%3A%20Date.
	// 	// la photo que je récupère en prenant une photo avec l'appareil est blob, voila pourquoi je dois transformer en file.
	// 	// const uploaded_photo = new File([this.photoStone], image.webPath, {type: image.format, lastModified: Date.now()});
	// 	// console.log("uploaded_photo: ", uploaded_photo.type);
	// 	// *************************
		
	// }

	// CREATE STONE
	// ----------------------------------------------------

	validateCreateStone() {
		//console.log(this.photoStoneImage);
		// Retrouver a quoi ca correspond
		this.onCreate = false;
		// Ici je crée une constante à laquelle j'assigne le titre donné par l'utilisateur à la pierre
		// qui me permettra de le renseigner dans la création du File object et de ne pas avoir le nom du blob,
		// mais celui de la pierre. Il faudra néamoin que je fasse en sorte qu'on ne puisse pas donner 2 x le meme nom à une pierre.
		// const photoTitle = this.stoneForm.value.title;
		// const photoType = this.photoStoneType.format;
		// const photoBlob = this.photoStoneBlob;
		//console.log("photoType = ", this.photoStoneType.format);
		// Ici je redéclare la const uploaded_photo que je re transforme en file donc peut etre pas nécessaire de le faire dans TakePicture.
		//const uploaded_photo = new File([this.photoStoneImage], `${photoTitle}-photo`, {type: "image/"+photoType, lastModified: Date.now()});
		// const uploaded_photo = this.photoStoneFile;
		console.log(this.uploaded_photo);
		this.api
			.validateCreateStone(
				this.stoneForm.value.title,
				this.stoneForm.value.description,
				(this.stoneForm.value.user_id = this.user_id),
				(this.stoneForm.value.inbag = true),
				// Pour assigner la valeur d'un fichier a mon input je dois passer par une constante.
				(this.stoneForm.value.photoStone = this.uploaded_photo),
				(this.stoneForm.value.createurName = this.user.fullname),
				 // on peux pas assigner un objet a un input en JS
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

	// Essais Loic Method via un event (ca restera une solution pour un input File )
	onFileChange(event) {
		const photoStone = event.target.files[0];
		this.uploaded_photo = photoStone;
		console.log(this.uploaded_photo);
		// pour rendre l'image lisible directement dans la balise img, une preview
		if (event.target.files && event.target.files[0]) {
    		let reader = new FileReader();
    		reader.onload = (event:any) => {
    		  this.img1 = event.target.result;
    		}
    		reader.readAsDataURL(event.target.files[0]);  // to trigger onload
  		}
  
  		let fileList: FileList = event.target.files;  
  		let file: File = fileList[0];
  		//console.log(file);
	}


	// createStone() {
	// 	//this.onCreate = true;
	// 	this.stoneForm = this.fb.group({
	// 		title: ["", Validators.required],
	// 		description: "",
	// 		user_id: "",
	// 		inbag: "",
	// 	});
	// }

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
				photoStone: ["", Validators.required],
				createurName: ""
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
