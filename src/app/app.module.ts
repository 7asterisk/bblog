import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AdsenseModule } from "ng2-adsense";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { TopnavComponent } from "./nav/topnav/topnav.component";
import { HomeComponent } from "./pages/home/home.component";
import { CatNavComponent } from "./pages/cat-nav/cat-nav.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { PostDetailsComponent } from "./pages/post-details/post-details.component";
import { DateAgoPipe } from "./pipes/date-ago.pipe";
import { CatsComponent } from "./pages/cats/cats.component";
import { PopularComponent } from "./pages/popular/popular.component";
import { LoadingComponent } from "./ui/loading/loading.component";

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HomeComponent,
    CatNavComponent,
    PostsComponent,
    PostDetailsComponent,
    DateAgoPipe,
    CatsComponent,
    PopularComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    AdsenseModule.forRoot({
      adClient: "ca-pub-9819312075649661"
      // adSlot: 7259870550
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
