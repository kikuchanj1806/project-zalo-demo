import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {routes} from "./app.routes";
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {LayoutComponent} from "./layout/layout.component";
import {AppSpinnerComponent} from "../../../../libs/share/components";
import {HeaderComponent} from "./components/header/header.component";
import {AppFooterComponent} from "./components/footer/footer.component";
import {SearchComponent} from "./components/actions/search.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    AppFooterComponent,
    SearchComponent
  ],
	 imports: [
		  BrowserModule,
		  HttpClientModule,
		  RouterModule.forRoot(routes, {
				useHash: false,
		  }),
		  FormsModule,
		  AppSpinnerComponent,
	 ],
  providers: [
    { provide: APP_BASE_HREF, useValue: environment.zaloBaseHref }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
