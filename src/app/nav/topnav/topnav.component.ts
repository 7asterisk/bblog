import { Component, OnInit, Inject } from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { DataService } from "src/app/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.scss"]
})
export class TopnavComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dataService: DataService,
    private router: Router
  ) {
    this.len = this.dataService.getLen();
    if (this.len == "hindi") {
      this.toChange = "marathi";
    } else {
      this.toChange = "hindi";
    }
  }
  len;
  toChange = "";
  goToAbout() {
    this.document.location.href = "https://buddhamaybharat.com/";
  }
  changelen() {
    this.dataService.changeLen();

    this.router.navigate([""]);
  }
  ngOnInit() {}
}
