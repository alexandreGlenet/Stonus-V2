import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, from, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Platform, LoadingController, AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ICreationUser } from "../shared/auth.interfaces";
import * as L from "leaflet";

const JWT_KEY = "my_token";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	private user = new BehaviorSubject(null);
	private _userIsAuthenticated = false;

	get userIsAuthenticated() {
		return this._userIsAuthenticated;
	}

	currentUser = this.getUserValue();
	token: string;
	//currentUserId = this.getUserId();

	map: L.Map;

	smallIcon = new L.Icon({
		iconUrl: "../../assets/img/rock-1.png",
		// iconRetinaUrl:
		// 	"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowUrl:
			//"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
			"../../assets/img/rock-shadow.png",
		shadowSize: [41, 41],
	});

	// CONSTRUCTOR
	// --------------------------------------------------------------------

	constructor(
		private http: HttpClient,
		private storage: Storage,
		private plt: Platform,
		private alertCtrl: AlertController,
	) {
		this.plt.ready().then(() => {
			this.storage.get(JWT_KEY).then((data) => {
				if (data) {
					console.log("JWT from storage: ", data);
					this.user.next(data);
				}
			});
		});
	}

	// STONES
	// --------------------------------------------------------------------------

	// GET STONES ---------------------------------------------------------------

	getStones(page = 1): Observable<any> {
		let options = {
			observe: "response" as "body",
			params: {
				per_page: "5",
				page: "" + page,
			},
			headers: new HttpHeaders({
				"Content-Type": "application/json; charset=utf-8",
				Authorization: "Bearer " + this.getUserToken(),
			}),
		};

		return this.http
			.get<any[]>(`${environment.authUrl}/stonus/v1/stones`, options)
			.pipe(
				map((res) => {
					let data = res["body"];

					for (let stone of data) {
						if (stone.photo) {
							stone.photo = stone.photo.sizes["medium"];
						} else if (stone.latitude) {
							L.marker([stone.latitude, stone.longitude], {
								icon: this.smallIcon,
							}).addTo(this.map);
					 	} //else if (stone.createurName) {
					//  	stone.createurName = stone.createurName['name'];
					//  }
						
					}

					return {
						stones: data,
						pages: res["headers"].get("x-wp-totalpages"),
						totalStones: res["headers"].get("x-wp-total"),
					};
				})
			);
	}

	// GET STONE
	// ---------------------------------------------------------------------------------------

	getStoneContent(id) {
		return this.http
			.get<any>(`${environment.authUrl}/stonus/v1/stones/${id}`)
			.pipe(
				map((stone) => {
					if (stone.photo) {
						stone.photo = stone.photo.sizes["medium"];
					  } // else if (stone.createurName) {
					//  	stone.createurName = stone.createurName['name'];
					//  }
					return stone;
				})
			);
	}

	// GET PRIVATE STONE
	// --------------------------------------------------------------------------------------------

	getPrivatePosts() {
		return this.http
			.get<any[]>(`${environment.apiUrl}/posts?_embed&status=private`)
			.pipe(
				map((data) => {
					for (let post of data) {
						if (post["_embedded"]["wp:featuredmedia"]) {
							post.media_url =
								post["_embedded"]["wp:featuredmedia"][0]["media_details"].sizes[
									"medium"
								].source_url;
						}
					}
					return data;
				})
			);
	}

	// CREATE STONE
	// -------------------------------------------------------------------------------------------

	validateCreateStone(title, description, user_id, inbag, uploaded_photo, createurName) {
		// -- safety, todo form validation
		if (
			!title ||
			!description
			// !photoStone
		) {
			console.log("error creation, missing elements");
			return of(null);
		}

		let options = {
			observe: "response" as "body",

			headers: new HttpHeaders({
				// "Content-Type": "application/json; charset=utf-8",
				Authorization: "Bearer " + this.getUserToken(),
			}),
		};
		//uploaded_photo.name = title
		console.log("Register Stone: ", title, description, user_id, inbag, uploaded_photo, createurName);
		const photo = [uploaded_photo, uploaded_photo.name];
		const postData = new FormData();
		postData.append("title", title);
		postData.append("description", description);
		postData.append("createur", user_id);
		postData.append("inbag", inbag);
		postData.append("createurname", createurName);
		// Essais photo
		
		postData.append("photo", uploaded_photo, uploaded_photo.name );
		console.log( uploaded_photo );
		//console.log(postData);
		return this.http.post(
			`${environment.stonusUrl}/stones/add`,
			postData,
			options
		);
	}

	// PLACED STONE
	// ---------------------------------------------------------------------------

	validatePlacedStone(id, latitude, longitude, inbag) {
		// -- safety, todo form validation
		if (
			!latitude ||
			!longitude
			// !photoStone
		) {
			console.log("error creation, missing elements");
			return of(null);
		}

		let options = {
			//observe: "response" as "body",

			headers: new HttpHeaders({
				"Content-Type": "application/json; charset=utf-8",
				Authorization: "Bearer " + this.getUserToken(),
			}),
		};

		console.log("Updating Stone: ", latitude, longitude, inbag);

		// const placedStoneData = new FormData();

		// placedStoneData.append("latitude", latitude);
		// placedStoneData.append("longitude", longitude);
		// placedStoneData.append("inbag", inbag);

		// LE FORMDATA APPEND NE FONCTIONNE PAS AVEC LE PUT ICI JE DOIS LE RENVOYER SOUS FORMAT JSON
		const Datata = {
			latitude: latitude,
			longitude: longitude,
			inbag: inbag,
		};

		return this.http.put(
			`${environment.authUrl}/stonus/v1/stones/${id}`,
			Datata,
			options
		);
	}

	// CHANGE AVATAR

	validateChangeAvatar(id, data) {
		// -- safety, todo form validation
		if (!data) {
			console.log("error creation, missing elements");
			return of(null);
		}

		let options = {
			//observe: "response" as "body",

			headers: new HttpHeaders({
				// "Content-Type": "application/json; charset=utf-8",
				// "Content-Disposition": "filename=name-of-file.jpg",
				Authorization: "Bearer " + this.getUserToken(),
			}),
		};

		console.log("Updating User: ", data);

		// const placedStoneData = new FormData();

		// placedStoneData.append("latitude", latitude);
		// placedStoneData.append("longitude", longitude);
		// placedStoneData.append("inbag", inbag);

		const photoData = {
			photo: data,
		};
		// const photoData = new FormData();
		// photoData.append("photo", data);
		// longitude: longitude,
		// inbag: inbag,

		return this.http.put(
			`${environment.authUrl}/stonus/v1/users/${id}`,
			photoData,
			options
		);
	}

	// FIND STONE
	// --------------------------------------------------------------------------------------------

	validateFindStone(id, FindStoneLat, FindStoneLong, FindStoneInbag) {
		if (
			FindStoneLat ||
			FindStoneLong
			// !photoStone
		) {
			console.log("error finding, missing elements");
			return of(null);
		}

		let options = {
			//observe: "response" as "body",

			headers: new HttpHeaders({
				"Content-Type": "application/json; charset=utf-8",
				Authorization: "Bearer " + this.getUserToken(),
			}),
		};

		console.log(
			"Updating Finding Stone: ",
			FindStoneLat,
			FindStoneLong,
			FindStoneInbag
		);

		// const placedStoneData = new FormData();

		// placedStoneData.append("latitude", latitude);
		// placedStoneData.append("longitude", longitude);
		// placedStoneData.append("inbag", inbag);

		// LE FORMDATA APPEND NE FONCTIONNE PAS AVEC LE PUT ICI JE DOIS LE RENVOYER SOUS FORMAT JSON
		const DataFindStone = {
			latitude: FindStoneLat,
			longitude: FindStoneLong,
			inbag: FindStoneInbag,
		};

		return this.http.put(
			`${environment.authUrl}/stonus/v1/take-stones/${id}`,
			DataFindStone,
			options
		);
	}

	// USERS
	// ---------------------------------------------------------------------------------------------

	// GET USERS
	// ----------------------------------------------------------------------------------------------

	getUsers(page = 1): Observable<any> {
		let options = {
			observe: "response" as "body",
			params: {
				per_page: "5",
				page: "" + page,
			},
			headers: new HttpHeaders({
				"Content-Type": "application/json; charset=utf-8",
				Authorization: "Bearer " + this.getUserToken(),
			}),
		};

		return this.http
			.get<any[]>(`${environment.authUrl}/stonus/v1/users`, options)
			.pipe(
				map((res) => {
					let data = res["body"];

					for (let user of data) {
						if (user.photo) {
							user.photo = user.photo.sizes["medium"];
						}
					}

					return {
						users: data,
						pages: res["headers"].get("x-wp-totalpages"),
						totalUsers: res["headers"].get("x-wp-total"),
					};
				})
			);
	}

	// GET USER
	// ---------------------------------------------------------------------------------------

	getUserContent(id) {
		return this.http
			.get<any>(`${environment.authUrl}/stonus/v1/users/${id}`)
			.pipe(
				map((user) => {
					if (user.photo) {
						//user.photo = user.photo.sizes["medium"];
					}
					// else {
					// 	user.photo.sizes["medium"] = "../assets/img/no-image.jpg";
					// }
					return user;
				})
			);
	}

	// AUTHENTIFICATION
	// ----------------------------------------------------------------------------------------

	// LOGIN
	// -----------------------------------------------------------------------------------------

	login(username: any, password: any) {
		return this.http
			.post(`${environment.authUrl}/jwt-auth/v1/token`, { username, password })
			.pipe(
				switchMap((data) => {
					console.log("got token: ", data);
					return from(this.storage.set(JWT_KEY, data));
				}),
				tap((data) => {
					this.user.next(data);
				})
			);
		this._userIsAuthenticated = true;
	}

	// signUp(username, email, password) {
	// 	return this.http.post(`${environment.authUrl}/stonus/v1/users/register`, {
	// 		username,
	// 		email,
	// 		password,
	// 	});
	// }

	// SIGN UP
	// --------------------------------------------------------------------------------------------

	signUp(username, email, password) {
		// -- safety, todo form validation
		if (!username || !email || !password) {
			this.EnregistrementMailError();
			console.log("error creation, missing elements");
			return of(null);
		} 
		
			
		

		console.log("Resgister user: ", username, email, password);

		const postData = new FormData();
		postData.append("username", username);
		postData.append("email", email);
		postData.append("password", password);

		return this.http.post(`${environment.stonusUrl}/users/register`, postData);
	}

	// RESET PASSWORD
	// ----------------------------------------------------------------------------------------------

	resetPassword(usernameOrEmail) {
		return this.http.post(`${environment.authUrl}/wp/v2/users/lostpassword`, {
			user_login: usernameOrEmail,
		});
	}

	// LOGOUT
	// -----------------------------------------------------------------------------------------------

	logout() {
		this._userIsAuthenticated = false;
		this.storage.remove(JWT_KEY).then(() => {
			this.user.next(null);
		});
	}

	// UTILITAIRES - AUTHENTIFICATION
	// -----------------------------------------------------------------------------------------------

	ActivateUserIsAuthenticated() {
		this._userIsAuthenticated = true;
	}

	// UTILITAIRES
	// -----------------------------------------------------------------------------------------------

	getCurrentUser() {
		return this.user.asObservable();
	}

	getUserValue() {
		return this.user.getValue();
	}

	getUserToken() {
		return this.user.getValue().token;
	}

	getUserId() {
		return this.user.getValue().id;
	}

	// ALERTE
	// ------------------------------------------------------------------------------------------------

	async EnregistrementMailError() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Erreur',
      subHeader: 'Enregistrement de compte',
      message: 'Vous avez oublié de renseigner une adresse mail !',
      buttons: ['OK']
    });

    await alert.present();
  }

  async EnregistrementPasswordError() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Erreur',
      subHeader: 'Enregistrement de compte',
      message: 'Vous avez oublié de renseigner un mot de passe',
      buttons: ['OK']
    });

    await alert.present();
  }

  async EnregistrementPseudoError() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Erreur',
      subHeader: 'Enregistrement de compte',
      message: 'Vous avez oublié de renseigner un pseudo',
      buttons: ['OK']
    });

    await alert.present();
  }
}
