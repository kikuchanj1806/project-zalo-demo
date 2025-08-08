import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {parseParams} from "../utils/app.utils";
import {environment} from "../../../apps/zalo-app1/src/environments/environment";
interface RequestParams {
  version?: string;
  serviceVersion?: string;
  appId?: string | number;
  businessId?: string | number;
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBaseUrlApi(endpoint: string): string {
    return environment.apiUrl + endpoint;
  }

  /** GET chung, với optional query params */
  get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    const url = this.buildUrl(endpoint);
    const httpParams = this.toHttpParams(params);
    return this.http.get<T>(url, { params: httpParams })
      .pipe(
        tap(res => {/* có thể xử lý global response ở đây */}),
        catchError(this.handleError)
      );
  }

  /** POST chung, body mặc định JSON */

  post<T>(endpoint: string, body: any): Observable<T> {
    const url = this.buildUrl(endpoint);
    const { version, appId, businessId } = environment.apiConfig;

    const {
      serviceVersion,
      ...payload
    } = body;

    let httpParams = new HttpParams();
    if (version) {
      httpParams = httpParams.set('version', version);
    } else if (serviceVersion) {
      httpParams = httpParams.set('version', serviceVersion);
    }
    if (appId  != null) { httpParams = httpParams.set('appId', String(appId)); }
    if (businessId != null) { httpParams = httpParams.set('businessId', String(businessId)); }

    const headers = this.buildHeaders();
    // 2) Gọi HTTP với params + payload
    return this.http.post<T>(url, payload, { headers: headers, params: httpParams })
      .pipe(
        tap(res => { /* xử lý chung */ }),
        catchError(this.handleError)
      );
  }

  private buildHeaders(): HttpHeaders {
    const token = 'VpRzOON1n4fr5u92eiW7DIwKWKoPdVeKjogxf201G9RcfuuJLoaCOiUWOkjQCpqTQkq4WGpWZTDb1i06JN9XkfpQC2iRkfPO9KyLs4HhbcGGxyqZvWsdr7l4rofFPeDs4X0A2CB9nKrsBWgKloh1cGIVSqmZ1JNs8V0IB4'
    const headerConfig: Record<string,string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headerConfig['Internal-App-Access-Token'] = token;
    }
    return new HttpHeaders(headerConfig);
  }

  /** Xây dựng URL đầy đủ */
  private buildUrl(endpoint: string): string {
    // endpoint cần bắt đầu bằng '/' hoặc bạn có thể kiểm soát tuỳ ý
    return `${this.baseUrl}${endpoint}`;
  }

  /** Chuyển object thành HttpParams */
  private toHttpParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return httpParams;
  }

  /** Xử lý lỗi chung */
  private handleError(error: HttpErrorResponse) {
    // Bạn có thể log ra console, gửi tới service monitoring, hoặc show message
    console.error('API error', error);
    // Tạo observable lỗi cho component bắt
    return throwError(() => new Error(
      error.error?.message || 'Có lỗi từ máy chủ, vui lòng thử lại sau.'
    ));
  }
}
