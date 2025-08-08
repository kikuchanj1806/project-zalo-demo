import {Injectable} from "@angular/core";
import {ProductService} from "../../../core/services/api-service/product.service";
import {IResDataDefault, IResponseApi, IResProduct} from "../../../core/models";
import {map, Observable} from "rxjs";

export interface ListObjectsOptions {
  filters: {
    sort?: Record<string, 'asc' | 'desc'>;
    show?: Record<string, number>;
    features?: number
  };
  paginator: {
    icpp: number;
    nextPage: number;
  };
}

@Injectable({providedIn: 'root'})
export class ProductShareService {
  constructor(private prdService: ProductService) {
  }

  private list(opts: ListObjectsOptions): Observable<IResponseApi<IResDataDefault<IResProduct[]>>> {
    // Generic sẽ mặc định là IResDataDefault<IResProduct[]>
    return this.prdService.searchProduct(opts);
  }

  getHomeProducts(
    icpp = 20,
    nextPage = 1
  ): Observable<IResponseApi<IResDataDefault<IResProduct[]>>> {
    return this.list({
      filters: {
        show: {
          // home: 1
        },
        features: 1
      },
      paginator: {icpp, nextPage}
    });
  }

  getHotProducts(
    icpp = 50,
    nextPage = 1
  ): Observable<IResponseApi<IResDataDefault<IResProduct[]>>> {
    return this.list({
      filters: {show: {hot: 1}},
      paginator: {icpp, nextPage}
    });
  }

  getNewProducts(
    icpp = 10,
    nextPage = 1
  ): Observable<IResponseApi<IResDataDefault<IResProduct[]>>> {
    return this.list({
      filters: {sort: {created_at: 'desc'}},
      paginator: {icpp, nextPage}
    });
  }
}
