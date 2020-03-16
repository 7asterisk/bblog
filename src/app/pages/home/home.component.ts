import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { DomSanitizer, Title, Meta } from "@angular/platform-browser";
import { NgNavigatorShareService } from "ng-navigator-share";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  posts: any;
  lastData = 0;
  imgUrl = "";
  loading = true;
  constructor(
    private dataService: DataService,
    private _sanitizer: DomSanitizer,
    private title: Title,
    private meta: Meta,
    private ngNavigatorShareService: NgNavigatorShareService
  ) {
    dataService.getPost(this.lastData).subscribe(data => {
      this.loading = false;
      this.posts = data;
      this.lastData = this.posts[this.posts.length - 1].news_date;
    });
    if (this.dataService.getLen() == "hindi") {
      this.imgUrl = "http://admi.hexadigi.com/upload/";
    } else {
      this.imgUrl = "http://admin.buddhamaybharat.com/upload/";
    }
  }

  onScroll() {
    this.loading = true;
    this.dataService.getPost(this.lastData).subscribe(data => {
      this.loading = false;
      this.posts = this.posts.concat(data);
      this.lastData = this.posts[this.posts.length - 1].news_date;
    });
  }
  ngOnInit() {}
  setMetaTag() {
    this.title.setTitle(
      "Buddhamay Bharat | blog | News in Hindi and Marathi language"
    );
    this.meta.addTags([
      { name: "twitter:card", content: "summary" },
      { name: "og:url", content: "/" },
      {
        name: "og:title",
        content: "Buddhamay Bharat News is in Hindi and Marathi"
      },
      {
        name: "og:description",
        content: "bahujan news and blog in Hindi and Marathi language."
      },
      {
        name: "og:image",
        content:
          "http://localhost:5500/work/bbharat/public/img/buddhamaybharat-logo.jpeg"
      }
    ]);
  }

  async sharePost(title, nid) {
    try {
      const sharedResponse = await this.ngNavigatorShareService.share({
        title: title,
        text: "buddhamaybharat news",
        url: "http://www.blog.buddhamaybharat.com/news;newsId=" + nid
      });
      console.log(sharedResponse);
    } catch (error) {
      console.log("You app is not shared, reason: ", error);
    }
  }

  getImg(image) {
    return this._sanitizer.bypassSecurityTrustUrl(image);
  }
}
