import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../../services/api.service";

import { Plugins } from "@capacitor/core";
import { AlertController } from "@ionic/angular";
const { Share } = Plugins;

@Component({
	selector: "app-stone-bag-details",
	templateUrl: "./stone-bag-details.page.html",
	styleUrls: ["./stone-bag-details.page.scss"],
})
export class StoneBagDetailsPage implements OnInit {
	stone = null;
	//Map
	// map: L.Map;
	// newMarker: any;
	// address: string[];

	comments = [];
	newComment = "";

	//Segment
	segmentModel = "map";

	constructor(
		private route: ActivatedRoute,
		private api: ApiService,
		private alertCtrl: AlertController
	) {}

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get("id");
		this.api.getStoneContent(id).subscribe((res) => {
			console.log("stone: ", res);
			this.stone = res;
		});

		// this.api.getComments(id).subscribe(res => {
		//   console.log('comments: ', res);
		//   this.comments = res;
		// });
	}

	ionViewDidEnter() {
		console.log("didEnter-stone-bag-detail.page");
		//this.map.remove();
		//console.log(this.map);
	}

	ionViewWillLeave() {
		console.log("willleave-stone-bag-detail.page");
	}
}
