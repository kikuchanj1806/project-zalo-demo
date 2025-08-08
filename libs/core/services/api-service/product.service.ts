import {Injectable} from "@angular/core";
import {ApiService} from "../api-common.service";
import {IResDataDefault, IResponseApi, IResProduct, IResProductDetail} from "../../models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'any'
})

export class ProductService extends ApiService {
  // Danh sách sản phẩm
  searchProduct<T = IResDataDefault<IResProduct[]>>(params = {}): Observable<IResponseApi<T>> {
    const fullUrl = '/api/product/search';
    return this.post<IResponseApi<T>>(fullUrl, params);
  }


  // Chi tiết sản phẩm
  getProductDetail = (params = {}) => {
    return this.post<IResponseApi<IResDataDefault<IResProductDetail>>>('/api/product/detail', params);
  }
}
