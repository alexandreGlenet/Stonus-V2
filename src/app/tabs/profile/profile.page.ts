import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import * as L from "leaflet";
//import { antPath } from "leaflet-ant-path";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

import { Plugins } from "@capacitor/core";
import {
	AlertController,
	ModalController,
	ToastController,
} from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { ChangeAvatarPage } from "./change-avatar/change-avatar.page";
import { FormGroup } from "@angular/forms";
const { Share } = Plugins;

@Component({
	selector: "app-stone-details",
	templateUrl: "./profile.page.html",
	styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
	users = null;
	user = null;
	currentUser = this.api.getUserValue();
	currentUserId = this.api.getUserId();
	avatarForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private api: ApiService,
		private alertCtrl: AlertController,
		public modalCtrl: ModalController,
		private toastCtrl: ToastController
	) {}

	ngOnInit() {
		// let id = this.route.snapshot.paramMap.get("id");
		// this.api.getUserContent(id).subscribe((res) => {
		// 	console.log("user: ", res);
		// 	this.user = res;
		// });
		// if (this.api.getCurrentUser() && this.api.getUserToken()) {
		// 	this.api.getCurrentUser;
		// }
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
		console.log("didEnter-profile.page");
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

	ionViewWillLeave() {
		console.log("willleave-profile.page");
	}

	//MODAL DE SELECTION DAVATAR
	async selectAvatar(user) {
		//console.log("selectAvatar");
		const modal = await this.modalCtrl.create({
			component: ChangeAvatarPage,
			componentProps: { photo: user.photo },
			cssClass: "my-custom-class",
		});
		await modal.present();

		// Récuperer les DATA et les transmettre.
		// j'aurais pu faire const data = await modal.onWillDismiss(); et remplacer le photoInput par data.data[0 ou 1].photoInputUrl, mais je ne savais pas assigner le role ici deposit pour ma condition (meme si pas nécessaire),je voulais juste avoir la possibilité d'avoir un bouton d'annulation dans le choix d'avatar exemple cancel.
		const {
			data: [{ photoInput }, { photoInputUrl }],
			role,
		} = await modal.onWillDismiss();

		if (role === "deposited") {
			this.user.photo.url = photoInputUrl;
			let id = this.api.getUserId();

			this.api.validateChangeAvatar(id, photoInput).subscribe(
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
			const alert = await this.alertCtrl.create({
				header: "Success",
				message: "avatar changé",
				buttons: ["ok"],
			});
			await alert.present();
			// this.user.photo === this.user.photo;
			console.log(this.user);
			//this.user.photo.id === data.data.photoInput;
		}
		// Créer une variable qui change pour réinitialiser la page au changement
		console.log(photoInput);
		console.log(this.user);
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
