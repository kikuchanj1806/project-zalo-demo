import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './features/home.component';
import {HomeRoutingModule} from "./home.routing";
import {SlideComponent} from "../../components/actions/slide.component";
import {ProductListComponent} from "../../components/product/product-list.component";

@NgModule({
  declarations: [
    HomeComponent,
    SlideComponent,
    ProductListComponent
  ],
  exports: [
    SlideComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule {
}
