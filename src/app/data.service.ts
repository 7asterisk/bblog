import { HttpClient } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class DataService {
  len = "hindi";
  url = "http://admi.hexadigi.com/get_data.php?";
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem("len")) {
        this.len = localStorage.getItem("len");
        if (this.len == "hindi") {
          this.url = "http://admi.hexadigi.com/get_data.php?";
        } else {
          this.url = "http://admin.buddhamaybharat.com/get_data.php?";
        }
      }
    }
  }
  getLen() {
    return this.len;
  }
  changeLen() {
    if (isPlatformBrowser(this.platformId)) {
      this.len = localStorage.getItem("len");
      if (this.len == "hindi") {
        localStorage.setItem("len", "marathi");
        console.log(localStorage.getItem("len"));
        this.url = "http://admin.buddhamaybharat.com/get_data.php?";
      } else {
        localStorage.setItem("len", "hindi");
        this.url = "http://admi.hexadigi.com/get_data.php?";
      }
      this.document.location.href = "http://www.blog.buddhamaybharat.com/";
    }
  }
  getPost(lastDate) {
    return this.http.get(this.url + "APIid=1&last_date=" + lastDate);
  }
  getCat() {
    return this.http.get(this.url + "APIid=2");
  }
  detPostByCat(cid, lastDate) {
    return this.http.get(
      this.url + "APIid=3&catId=" + cid + "&last_date=" + lastDate
    );
  }
  getPostById(nid) {
    return this.http.get(this.url + "APIid=4&nid=" + nid);
  }
}
