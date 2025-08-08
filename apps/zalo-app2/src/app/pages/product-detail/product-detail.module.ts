import {NgModule} from '@angular/core';
import {ProductDetailComponent} from "./features/product-detail.component";
import {CommonModule} from "@angular/common";
import {ProductDetailRouting} from "./product-detail.routing";
import {ShareButtonComponent} from "../../components/actions/share-button.component";
import {AppSpinnerComponent} from "../../../../../../libs/share/components";
import {HomeModule} from "../../../../../zalo-app1/src/app/pages/home/home.module";

@NgModule({
  declarations: [
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductDetailRouting,
    ShareButtonComponent,
    AppSpinnerComponent,
    HomeModule,
  ]
})
export class ProductDetailModule {
}
