import { Component, OnInit, Input } from "@angular/core";
import {
	ModalController,
	ToastController,
	AlertController,
} from "@ionic/angular";
import {
	FormControl,
	Validators,
	FormGroup,
	FormBuilder,
} from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-change-avatar",
	templateUrl: "./change-avatar.page.html",
	styleUrls: ["./change-avatar.page.scss"],
})
export class ChangeAvatarPage implements OnInit {
	@Input() photo: string;
	avatarForm: FormGroup;
	photoInput = new FormControl("", Validators.required);
	photoInputUrl = new FormControl("", Validators.required);
	user_id = this.api.getUserId();
	user = null;
	currentUser = this.api.getUserValue();
	currentUserId = this.api.getUserId();

	//ID des photos dans l'admin wordpress pour le changement des avatars (ne fonctionne que par l'id et pas l'url ou autres. et bien en number, voir via postman voici la requete dans postman en put : https://stonus.dev/wp-json/stonus/v1/users/1?photo=242  )
	photo1 = 242;
	photo2 = 248;
	photo3 = 247;
	photo4 = 246;
	photo5 = 249;
	photo6 = 250;

	// URl des photo uniquement pour le front car probleme avec la récupération de l'url via l'id dans le html.
	photoUrl1 = "https://stonus.dev/wp-content/uploads/2020/10/1.png";
	photoUrl2 = "https://stonus.dev/wp-content/uploads/2020/10/2.png";
	photoUrl3 = "https://stonus.dev/wp-content/uploads/2020/10/3.png";
	photoUrl4 = "https://stonus.dev/wp-content/uploads/2020/10/4.png";
	photoUrl5 = "https://stonus.dev/wp-content/uploads/2020/10/5.png";
	photoUrl6 = "https://stonus.dev/wp-content/uploads/2020/10/6.png";

	constructor(
		private route: ActivatedRoute,
		private modalCtrl: ModalController,
		private api: ApiService,
		private fb: FormBuilder,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController
	) {}

	ngOnInit() {
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

	closeChangeAvatar() {
		// en utilisant le ModalController injecté cette page
		// peut "ignorer" lui-même et éventuellement renvoyer des données
		const newPhoto = [this.photoInput.value, this.photoInputUrl.value];
		this.modalCtrl.dismiss(newPhoto, "cancel");
	}

	// validateChangeAvatar() {
	// 	console.log(
	// 		"https://stonus.alexandre-glenet.be/wp-content/uploads/2020/10/1.png"
	// 	);

	// 	this.modalCtrl.dismiss({
	// 		dismissed: true,
	// 	});
	// }

	changeAvatar() {
		this.photoInput.setValue({
			photoInput: this.photo1,
		});
		this.photoInputUrl.setValue({
			photoInputUrl: this.photoUrl1,
		});
	}

	changeAvatar2() {
		this.photoInput.setValue({
			photoInput: this.photo2,
		});
		this.photoInputUrl.setValue({
			photoInputUrl: this.photoUrl2,
		});
	}

	changeAvatar3() {
		this.photoInput.setValue({
			photoInput: this.photo3,
		});
		this.photoInputUrl.setValue({
			photoInputUrl: this.photoUrl3,
		});
	}

	changeAvatar4() {
		this.photoInput.setValue({
			photoInput: this.photo4,
		});
		this.photoInputUrl.setValue({
			photoInputUrl: this.photoUrl4,
		});
	}

	changeAvatar5() {
		this.photoInput.setValue({
			photoInput: this.photo5,
		});
		this.photoInputUrl.setValue({
			photoInputUrl: this.photoUrl5,
		});
	}

	changeAvatar6() {
		this.photoInput.setValue({
			photoInput: this.photo6,
		});
		this.photoInputUrl.setValue({
			photoInputUrl: this.photoUrl6,
		});
	}

	validateChangeAvatar() {
		// console.log(this.photoInput.value);
		const newPhoto = [this.photoInput.value, this.photoInputUrl.value];
		//const newPhotoUrl = this.photoInputUrl.value;
		console.log(newPhoto);
		this.modalCtrl.dismiss(newPhoto, "deposited");
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
