import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-popular",
  templateUrl: "./popular.component.html",
  styleUrls: ["./popular.component.scss"]
})
export class PopularComponent implements OnInit {
  posts;
  lastData = 0;
  catid = 27;
  constructor(
    private dataService: DataService,
    private router: ActivatedRoute
  ) {
    this.dataService.detPostByCat(this.catid, this.lastData).subscribe(data => {
      this.posts = data;
      this.lastData = this.posts[this.posts.length - 1].news_date;
      this.posts = this.posts.concat(data);
    });
  }

  ngOnInit() {}
}
