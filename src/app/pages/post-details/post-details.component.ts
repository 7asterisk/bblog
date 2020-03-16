import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { ActivatedRoute } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"]
})
export class PostDetailsComponent implements OnInit {
  nid;
  news;
  imgUrl = "";

  constructor(
    private dataService: DataService,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    this.router.paramMap.subscribe(param => {
      this.nid = Number(param.get("newsId"));
      console.log(this.nid);

      this.dataService.getPostById(this.nid).subscribe(data => {
        this.news = data[0];
        console.log(data);
        this.setMetaTag();
      });
    });
    if (this.dataService.getLen() == "hindi") {
      this.imgUrl = "http://admi.hexadigi.com/upload/";
    } else {
      this.imgUrl = "http://admin.buddhamaybharat.com/upload/";
    }
  }

  ngOnInit() {}
  setMetaTag() {
    this.title.setTitle(this.news.news_title);
    this.meta.addTags([
      { name: "twitter:card", content: "summary" },
      { name: "og:url", content: "/news" },
      { name: "og:title", content: this.news.news_title },
      { name: "og:description", content: this.news.news_description },
      {
        name: "og:image",
        content: "http://admi.hexadigi.com/upload/" + this.news.news_image
      }
    ]);
  }
}
