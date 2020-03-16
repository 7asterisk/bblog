import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";

@Component({
  selector: "app-cats",
  templateUrl: "./cats.component.html",
  styleUrls: ["./cats.component.scss"]
})
export class CatsComponent implements OnInit {
  cats: any;
  imgUrl = "";
  constructor(private dataService: DataService) {
    this.dataService.getCat().subscribe(data => {
      this.cats = data;
      if (this.dataService.getLen() == "hindi") {
        this.imgUrl = "http://admi.hexadigi.com/upload/category/";
      } else {
        this.imgUrl = "http://admin.buddhamaybharat.com/upload/category/";
      }
    });
  }

  ngOnInit() {}
}
