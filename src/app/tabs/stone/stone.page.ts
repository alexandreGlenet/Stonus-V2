import { Component, OnInit } from "@angular/core";
import { SegmentChangeEventDetail } from "@ionic/core";
import { ApiService } from "src/app/services/api.service";
import {
	LoadingController,
	ModalController,
	AlertController,
	ToastController,
} from "@ionic/angular";
import { ChangeDetectorRef, ElementRef } from "@angular/core";

import * as L from "leaflet";
//import { antPath } from "leaflet-ant-path";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { getInterpolationArgsLength } from "@angular/compiler/src/render3/view/util";
import { ActivatedRoute } from "@angular/router";
import { StoneFoundPage } from "src/app/modals/stone-found/stone-found.page";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "app-stone",
	templateUrl: "./stone.page.html",
	styleUrls: ["./stone.page.scss"],
})
export class StonePage implements OnInit {
	//Map
	map: L.Map;
	newMarker: any;
	circle: any;
	location: string[];
	position: any;
	getPositionLocation;
	markerStone;
	distance;
	div;
	stoneId;
	FindStoneLat: any;
	FindStoneLong: any;
	FindStoneInbag: any;
	stoneIsFinded: boolean;
	//GetAddValueFindStone = this.addValueFindStone();

	FindStoneForm: FormGroup;

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
		//forceZIndex: 99,
	});

	mainLayer = L.tileLayer(
		"https://api.mapbox.com/styles/v1/alexandreglenet/ckcejm9mm0zyc1intuti37pry/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWxleGFuZHJlZ2xlbmV0IiwiYSI6ImNrYXh2MTNibTAzZ2Uyem1pM204ZmRlMmgifQ.mT8THO0ylcMa2VwJSKmczA",
		//"https://api.mapbox.com/styles/v1/alexandreglenet/ckcejm9mm0zyc1intuti37pry.html?fresh=true&title=copy&access_token=pk.eyJ1IjoiYWxleGFuZHJlZ2xlbmV0IiwiYSI6ImNrYXh2MTNibTAzZ2Uyem1pM204ZmRlMmgifQ.mT8THO0ylcMa2VwJSKmczA",
		//"https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
		//"http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png",
		//"https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.pingback",
		//"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		{
			attribution:
				'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>',
			minZoom: 10, //16
			maxZoom: 21,
			//tileSize: 512,
			//zoomOffset: -1,
		}
	);

	customOptions = {
		maxWidth: "500",
		className: "custom",
	};

	//getcoucou = this.coucou();

	//Stones-list
	page = 1;
	stones = [];
	totalPages = 0;
	totalStones = 0;
	stone;

	//Segment
	segmentModel = "map";

	//Je viens de stone-list
	DetailsIsActive = false;

	// NOTE A MOI MEME, pour intéragir directement avec une pierre je dois passer par la fonction loadStones
	// Ou alors penser a faire apparaitre les pierres suivant la distance et quand l'utilisateur est sur
	// une pierre faire apparaitre un bouton qui déclencherais une fonction indépendante.

	// CONSTRUCTOR
	// -----------------------------------------------------------------------

	constructor(
		private api: ApiService,
		private loadingCtrl: LoadingController,
		private cf: ChangeDetectorRef,
		private modalCtrl: ModalController,
		private elementRef: ElementRef,
		private route: ActivatedRoute,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController
	) {}

	// LIFE CYCLE
	// -----------------------------------------------------------------------

	ngOnInit() {
		console.log(this.api.getUserId());
		console.log(this.api.getUserToken());
	}

	ionViewWillEnter() {
		// if (this.api.getCurrentUser() && this.api.getUserToken()) {
		// 	this.loadStones();
		// }
	}

	ionViewDidEnter() {
		console.log("stone.page: didEnter");
		this.loadLocateMap(); // 2- je charge sur "map"
		console.log("stone.page: willEnter");
		if (this.api.getCurrentUser() && this.api.getUserToken()) {
			this.loadStones();
		}
		//console.log(this.positionLocation());
		console.log(this.DetailsIsActive);
		if (this.DetailsIsActive === true) {
			// 3 - si je viens détails, réaffiche moi "stones-list". et donc plus de probleme d'affichage.
			this.segmentModel = "stones-list";
			this.DetailsIsActive = false;
		}
		//console.log(this.map);
		console.log(this.segmentModel);
		console.log(this.position);
	}

	ionViewWillLeave() {
		console.log("stone.page: willleave");
		//console.log(this.map);
		this.segmentModel = "map"; // 1 - Quand je sors je reidrige vers map pour qu'au chargement de la map il n'yai pas de probleme graphique

		if (this.map !== undefined) {
			this.map.remove();
		} else {
			//this.map.remove();
		}
	}

	// ionViewDidLeave() {
	// 	this.map.remove();
	// }

	async presentModal() {
		const modal = await this.modalCtrl.create({
			component: StoneFoundPage,
			//cssClass: "my-custom-class",
		});
		return await modal.present();
	}

	async presentAlert() {
		const alert = await this.alertCtrl.create({
			cssClass: "my-custom-class",
			header: "Prendre la pierre",
			subHeader: "As-tu trouvés la pierre ?",
			message: "This is an <strong>alert message</strong>.",
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
					cssClass: "warning",
					handler: (blah) => {
						//this.addValueFindStone();
						//this.stoneIsFinded = false;
						this.notRemoveMarkerStone();
					},
				},
				{
					text: "Okay",
					//role: "cancel",
					cssClass: "success",
					handler: () => {
						this.addValueFindStone();
						this.validateFindStone();
						this.removeMarkerStone();
					},
				},
			],
		});

		await alert.present();
		let result = await alert.onDidDismiss();
		console.log(result);
	}

	addValueFindStone() {
		this.FindStoneLat = null;
		this.FindStoneLong = null;
		this.FindStoneInbag = 1;

		// this.FindStoneForm.value.latitude = this.newMarker.getLatLng().lat;
		// this.FindStoneForm.value.longitude = this.newMarker.getLatLng().lng;
		console.log("latitude: ", this.FindStoneLat);
		console.log("longitude: ", this.FindStoneLong);
		console.log("Inbag: ", this.FindStoneInbag);
	}

	// Validate placed Stone
	// --------------------------------------------------------------------------------------
	validateFindStone() {
		//this.onCreate = false;
		let id = this.stoneId;
		//console.log("STONES ID : ", id);
		//console.log(this.placedStoneForm.value.latitude);
		this.api
			.validateFindStone(
				id,
				this.FindStoneLat,
				this.FindStoneLong,
				this.FindStoneInbag
			)
			.subscribe(
				async (res) => {
					const toast = await this.toastCtrl.create({
						message: "Votre Pierre a bien été placée !",
						duration: 3000,
						position: "top",
					});
					toast.present();
					//this.loadStones();
				},
				(err) => {
					this.showError(err);
				}
			);
	}

	// LOAD-STONES
	// -----------------------------------------------------------------

	async loadStones() {
		let loading = await this.loadingCtrl.create({
			message: "Chargement des pierres...", // Loading Stones
		});

		await loading.present();

		this.api.getStones(this.page).subscribe(
			(res) => {
				console.log("res: ", res);

				this.stones = res.stones;
				this.totalPages = res.totalPages;
				this.totalStones = res.totalStones;

				//afficher les pierres sur la map
				for (let stone of this.stones) {
					if (stone.latitude) {
						this.markerStone = L.marker([stone.latitude, stone.longitude], {
							icon: this.smallIcon,
						})
							.setZIndexOffset(1000)
							.addTo(this.map);

						// TECHNIQUE POUR INTERAGIR AVEC UN BOUTON DU bindPopup
						// ----------------------------------------------------------------------------------------------------------------------------
						// const txt = `
						// <style>.leaflet-popup-content {
						// 		width:unset;
						// 		display: table;
						// 		}
						// 		.leaflet-popup-content-wrapper{
						// 			display: table-cell;
						// 		}
						// </style>

						// <ion-button class="eventPopup">coucou ${stone.title}</ion-button>
						// `;
						// const popupOptions = {
						// 	className: "command",
						// };

						// Pour chaque pierre posée sur la map je lui ouvre une popup si on clique dessus, qui affiche txt. (probleme avec le bouton ionique l'attribut (click) ne déclenche pas la fonction.)
						// this.markerStone
						// 	.bindPopup(txt, popupOptions)
						// 	.on("popupopen", () => {
						// 		this.elementRef.nativeElement
						// 			.querySelector(".eventPopup")
						// 			.addEventListener("click", (e) => {
						// 				//this.stoneId = stone.id;
						// 				this.presentAlert();
						// 			});
						// 	});

						// FIN DE TECHNIQUE POUR INTERAGIR AVEC LE bindPopup de Leaflet
						// ------------------------------------------------------------------------------------------------------------------------------
						//.openPopup()
						// Pour chaque pierre posée sur la map si je clique dessus je récupère l'ID.
						this.markerStone.on("click", () => {
							//console.log(stone.id);
							this.stoneId = stone.id;
							this.presentAlert();
						});

						this.distance = this.getDistance(
							[this.newMarker.getLatLng().lat, this.newMarker.getLatLng().lng],
							[stone.latitude, stone.longitude]
						);
						if (this.distance < 1500) {
							this.markerStone.on("click", () => {
								//this.stoneId = stone.id; //console.log(stone.id);
								//this.coucou();
							});
						}
					}
				}
				// avant pas encore bon : console.log(this.positionLocation());
			},
			(err) => {
				console.log("errors :", err);
			},
			() => {
				loading.dismiss();
			}
		);
	}
	coucou() {
		console.log(this.stoneId);
	}

	removeMarkerStone() {
		this.stoneIsFinded = true;
		if ((this.stoneIsFinded = true)) {
			this.map.removeLayer(this.markerStone);
			this.stoneIsFinded = false;
		}
	}

	notRemoveMarkerStone() {
		this.stoneIsFinded = false;
	}

	// POSITION - MAP
	// ------------------------------------------------------

	// loadMap() {
	// 	this.map = new L.Map("mapId2").setView([50.64, 5.576], 19); // fitworld fait buguer donc j'assigne une coordonnée au chargmenet ici l'univ de liege
	// 	//this.locatePosition();
	// 	this.mainLayer.addTo(this.map);
	// }

	locatePosition() {
		this.map
			.locate({
				setView: true,
				minZoom: 6,
				maxZoom: 19,
				watch: true,
				enableHighAccuracy: true,
			})
			.on("locationfound", (e: any) => {
				// if => si map.locate est en watch true, quand il me relocalise il me rajoute un marker a chaque fois,
				// donc ici j'essaie de supprimer ce marker pour n'avoir qu'un seul marker d'utilisateur.
				//this.newMarker = this.newMarker;
				var radius = e.accuracy / 2;
				if (this.map.hasLayer(this.newMarker)) {
					console.log(this.newMarker);
					this.map.removeLayer(this.newMarker);
					this.map.removeLayer(this.circle);
				}

				this.newMarker = L.marker([e.latitude, e.longitude], {
					//forceZIndex: 90,
					draggable: false,
				}).addTo(this.map);
				// Recupérer la position du marqueur
				this.position = this.newMarker.getLatLng();
				console.log(this.position); //bon
				// {lat: 50.5876328, lng: 5.6089782} => Noomia
				this.newMarker
					.bindPopup("Je suis à !!!" + radius + " metres de ce point")
					.openPopup();

				this.circle = L.circle([e.latitude, e.longitude], radius).addTo(
					this.map
				);

				this.newMarker.on("dragend", () => {
					this.position = this.newMarker.getLatLng();
				});

				// Je pose le marker
			})
			.on("locationError", (e: any) => {
				alert(e.message);
				console.log(e.message);
			});
	}

	positionLocation() {
		this.location = this.newMarker.getLatLng();
		console.log(this.location);
	}

	loadLocateMap() {
		// let loading = await this.loadingCtrl.create({
		// 	message: "Chargement de la localisation...", // Loading Stones
		// });

		// await loading.present();

		this.map = new L.Map("mapId").setView([50.64, 5.576], 16);
		this.mainLayer.addTo(this.map);
		this.locatePosition();
	}

	// PLACE STONE AT MAP
	// -----------------------------------------------------------

	confirmPickupLocation() {
		this.getPositionLocation = this.newMarker.getLatLng().lat;
		for (let stone of this.stones) {
			// En mettant le this.distance avant je l'ai en metres que si je le met apres je l'ai en millimètre bizarre....
			this.distance = this.getDistance(
				[this.newMarker.getLatLng().lat, this.newMarker.getLatLng().lng],
				[stone.latitude, stone.longitude]
			);
			// je regle la distance d'approche d'une pierre pour pouvoir intéragir avec.
			if (stone.latitude && this.distance < 15) {
				//1500 = 15 metre
				// 10 millions 3
				//if ((this.getPositionLocation = this.markerStone.getLatLng())) {
				console.log("coucou");
				//}
			}
			//var distance = getDistance([lat1, lng1], [lat2, lng2])
		}
	}

	// GET THE DISTANCE ORIGIN TO DESTINATION
	// ----------------------------------------------------------------------------------------------------
	//essais pour calculer la distance
	getDistance(origin, destination) {
		// retour en millimetres
		// return distance in meters
		var lon1 = this.toRadian(origin[1]),
			lat1 = this.toRadian(origin[0]),
			lon2 = this.toRadian(destination[1]),
			lat2 = this.toRadian(destination[0]);

		var deltaLat = lat2 - lat1;
		var deltaLon = lon2 - lon1;

		var a =
			Math.pow(Math.sin(deltaLat / 2), 2) +
			Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
		var c = 2 * Math.asin(Math.sqrt(a));
		var EARTH_RADIUS = 6371;
		return c * EARTH_RADIUS * 1000;
	}
	toRadian(degree) {
		return (degree * Math.PI) / 180;
	}
	//var distance = getDistance([lat1, lng1], [lat2, lng2])

	// FIN DES DEUX FONCTIONS POUR CALCULER LA DISTANCE ENTRE 2 POINTS -----------------------------
	// -------------------------------------------------------------------------------------------------------

	placeStone() {
		//this.location = this.newMarker.getLatLng();
		var lat = this.newMarker.getLatLng().lat;
		var lng = this.newMarker.getLatLng().lng;
		L.marker([lat, lng], {
			//50.597068799999995, 5.6131584000000005
			icon: this.smallIcon,
		}).addTo(this.map);
	}

	selectStone() {}

	// EVENT ON SEGMENT
	// ------------------------------------------------------------

	onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
		//console.log(event.detail);
		// if (event.detail.value == "stones-list") {
		// 	console.log(event.detail.value);
		// } else {
		// 	console.log(event.detail.value);
		// }
	}

	// UTILITAIRES
	// --------------------------------------------------------------

	// Fonction qui permet de d'avoir un boolean pour voir si je viens de la liste quand je vais sur le detail d'une pierre.
	onStoneDetails() {
		this.DetailsIsActive = true;
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
}
