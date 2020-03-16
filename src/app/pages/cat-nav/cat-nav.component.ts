import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";

@Component({
  selector: "app-cat-nav",
  templateUrl: "./cat-nav.component.html",
  styleUrls: ["./cat-nav.component.scss"]
})
export class CatNavComponent implements OnInit {
  cat: any;
  imgUrl;
  constructor(private dataService: DataService) {
    this.dataService.getCat().subscribe(data => {
      this.cat = data;
    });
  }

  ngOnInit() {}
}
