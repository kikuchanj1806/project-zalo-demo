import {Component, OnInit} from "@angular/core";
import {ProductShareService} from "../../../../../../libs/share/services/global";
import {IResProduct} from "../../../../../../libs/core/models";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [`product-list.component.scss`]
})

export class ProductListComponent implements OnInit {
  products: IResProduct[] = []
  categories: any

  constructor(
    private prdShareService: ProductShareService
  ) {
  }

  ngOnInit() {
    this.prdShareService.getHomeProducts().subscribe({
      next: res => {
        this.products = res.data.result
      }
    })
  }
}
