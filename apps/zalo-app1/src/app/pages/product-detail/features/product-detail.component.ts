import {Component, OnInit} from "@angular/core";
import {ProductService} from "../../../../../../../libs/core/services/api-service/product.service";
import {NavService} from "../../../../../../../libs/core/services/nav.service";
import {IResProductDetail} from "../../../../../../../libs/core/models";
import {SpinnerService} from "../../../../../../../libs/core/services/spinner.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  idProduct!: number
  productData!: IResProductDetail
  imagesItem: Array<{ img: string; title?: string }> = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private prdService: ProductService,
    private navService: NavService,
  ) {
    this.idProduct = this.navService.getParam('id')
  }

  ngOnInit() {
    const params = {
      id: +this.idProduct
    }

    this.isLoading = true;

    this.prdService.getProductDetail(params)
      .subscribe({
        next: res => {
          this.isLoading = false;

          if (!res.code) {
            this.errorMessage = 'Lỗi dữ liệu trả về từ server.';
            return;
          }

          this.productData = res.data.result;
          const sourceImgs = (this.productData.images?.length ?? 0) > 0
            ? this.productData.images!
            : [this.productData.image];

          this.imagesItem = sourceImgs.map(imgUrl => ({
            img: imgUrl,
            title: this.productData.name
          }));
        },
        error: err => {
          console.error('Lỗi khi tải chi tiết sản phẩm', err);
          this.isLoading = false;
          this.errorMessage = 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.';
        }
      });
  }

}
