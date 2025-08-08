import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  private firstRequest = true;
  constructor(private spinner: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activeRequests++;
    if (this.firstRequest) {
      setTimeout(() => this.spinner.show(), 0);
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          setTimeout(() => this.spinner.hide(), 0);
          this.firstRequest = false;
        }
      })
    );
  }
}
