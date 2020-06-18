import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { AlertController } from "@ionic/angular";

@Component({
	selector: "app-stone-update",
	templateUrl: "./stone-update.page.html",
	styleUrls: ["./stone-update.page.scss"],
})
export class StoneUpdatePage implements OnInit {
	stone = null;
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
		console.log("didEnter-stone-detail.page");
		//this.map.remove();
		//console.log(this.map);
	}

	// async sharePost() {
	//   await Share.share({
	//     title: this.post.title.rendered,
	//     text: 'Check out this post!',
	//     url: this.post.link,
	//     dialogTitle: 'Share now'
	//   });
	// }

	ionViewWillLeave() {
		console.log("willleave-stone-detail.page");
	}

	// addComment() {
	//   this.api.addComment(this.post.id, this.newComment).subscribe(res => {
	//     this.newComment = '';
	//   }, async err => {
	//     const alert = await this.alertCtrl.create({
	//       header: err.error.code,
	//       subHeader: err.error.data.status,
	//       message: err.error.message,
	//       buttons: ['OK']
	//     });
	//     await alert.present();
	//   })
	// }
}
