import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
//import { ModalPage } from "../modal/modal.page";

@Component({
	selector: "app-stone-found",
	templateUrl: "./stone-found.page.html",
	styleUrls: ["./stone-found.page.scss"],
})
export class StoneFoundPage implements OnInit {
	constructor(public modalCtrl: ModalController) {}

	ngOnInit() {}

	dismiss() {
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		this.modalCtrl.dismiss({
			dismissed: true,
		});
	}
}
