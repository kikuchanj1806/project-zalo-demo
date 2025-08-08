import { NgModule } from '@angular/core';
import {ProductDetailComponent} from "./features/product-detail.component";
import {CommonModule} from "@angular/common";
import {ProductDetailRouting} from "./product-detail.routing";
import {ShareButtonComponent} from "../../components/actions/share-button.component";
import {HomeModule} from "../home/home.module";
import {AppSpinnerComponent} from "../../../../../../libs/share/components";
@NgModule({
  declarations: [
    ProductDetailComponent
  ],
	 imports: [
		  CommonModule,
		  ProductDetailRouting,
		  ShareButtonComponent,
		  HomeModule,
		  AppSpinnerComponent
	 ]
})
export class ProductDetailModule {}
