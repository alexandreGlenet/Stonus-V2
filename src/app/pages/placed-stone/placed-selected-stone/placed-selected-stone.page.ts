import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import * as L from "leaflet";
//import { antPath } from "leaflet-ant-path";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

import { Plugins } from "@capacitor/core";
import { AlertController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
const { Share } = Plugins;

@Component({
	selector: "app-stone-details",
	templateUrl: "./placed-selected-stone.page.html",
	styleUrls: ["./placed-selected-stone.page.scss"],
})
export class PlacedSelectedStonePage implements OnInit {
	// Declaration
	// -----------------------------------------------------------------------------------
	stone = null;
	// MAP
	// -----------------------------------------------------------------------------------
	map: L.Map;
	newMarker: any;
	location: string[];
	// MAP-ICON
	// -----------------------------------------------------------------------------------
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
	// MAP-LAYER
	// ------------------------------------------------------------------------------------
	mainLayer = L.tileLayer(
		"https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
		//http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png
		//https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png
		//"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		{
			attribution:
				'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>',
			minZoom: 4,
			maxZoom: 18,
			//tileSize: 512,
			//zoomOffset: -1,
		}
	);

	// CONSTRUCTOR
	// --------------------------------------------------------------------------------------
	constructor(
		private route: ActivatedRoute,
		private api: ApiService,
		private alertCtrl: AlertController
	) {}

	// LIFE-CYCLE
	// --------------------------------------------------------------------------------------

	ngOnInit() {
		console.log("placed-selected-stone: ngOnInit");
		let id = this.route.snapshot.paramMap.get("id");
		this.api.getStoneContent(id).subscribe((res) => {
			console.log("stone: ", res);
			this.stone = res;
		});
	}

	ionViewDidEnter() {
		console.log("placed-selected-stone: didEnter");
		this.loadLocateMap();
	}

	ionViewWillLeave() {
		console.log("placed-selected-stone: willleave");
		if (this.map !== undefined) {
			this.map.remove();
		} else {
			//this.map.remove();
		}
	}

	// MAP & LOCATION
	// ----------------------------------------------------------------------------------------------

	// Locate Position
	// ---------------------------------------------------------------------------------

	locatePosition() {
		this.map
			.locate({
				setView: true,
				minZoom: 6,
				maxZoom: 19,
				//watch: true,
				enableHighAccuracy: true,
			})
			.on("locationfound", (e: any) => {
				var radius = e.accuracy / 2;
				this.newMarker = L.marker([e.latitude, e.longitude], {
					draggable: false,
				}).addTo(this.map);
				// Recupérer la position du marqueur
				const position = this.newMarker.getLatLng();
				//console.log(position);
				// {lat: 50.5876328, lng: 5.6089782} => Noomia
				this.newMarker
					.bindPopup("Je suis à !!!" + radius + " metres de ce point")
					.openPopup();

				L.circle([e.latitude, e.longitude], radius).addTo(this.map);

				this.newMarker.on("dragend", () => {
					const position = this.newMarker.getLatLng();
				});
			})
			.on("locationError", (e: any) => {
				alert(e.message);
				console.log(e.message);
			});
	}

	// Position Location
	// ---------------------------------------------------------------------------------

	positionLocation() {
		this.location = this.newMarker.getLatLng();
		console.log(this.location);
	}

	// Load Loacate Map
	// ----------------------------------------------------------------------------------

	loadLocateMap() {
		this.map = new L.Map("mapId-2").setView([50.64, 5.576], 16);
		this.mainLayer.addTo(this.map);
		this.locatePosition();
	}
	// END -----------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------
}
