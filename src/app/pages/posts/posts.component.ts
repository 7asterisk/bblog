import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { ActivatedRoute } from "@angular/router";
import { NgNavigatorShareService } from "ng-navigator-share";
@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  posts;
  lastData = 0;
  catid = 1;
  loading = true;
  imgUrl = "";
  constructor(
    private dataService: DataService,
    private router: ActivatedRoute,
    private ngNavigatorShareService: NgNavigatorShareService
  ) {
    this.router.paramMap.subscribe(param => {
      this.loading = true;
      this.lastData = 0;
      this.catid = Number(param.get("catId"));
      this.dataService
        .detPostByCat(this.catid, this.lastData)
        .subscribe(data => {
          this.loading = false;
          this.posts = data;
          this.lastData = this.posts[this.posts.length - 1].news_date;
        });
    });
    if (this.dataService.getLen() == "hindi") {
      this.imgUrl = "http://admi.hexadigi.com/upload/";
    } else {
      this.imgUrl = "http://admin.buddhamaybharat.com/upload/";
    }
  }

  onScroll() {
    this.loading = true;
    this.dataService.detPostByCat(this.catid, this.lastData).subscribe(data => {
      this.loading = false;
      this.posts = this.posts.concat(data);
      this.lastData = this.posts[this.posts.length - 1].news_date;
    });
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

  ngOnInit() {}
}
