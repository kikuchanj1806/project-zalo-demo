import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private _loading = new BehaviorSubject<boolean>(false);
  /** Observable để component subscribe */
  readonly isLoading$: Observable<boolean> = this._loading.asObservable();

  /** Gọi để bật spinner */
  show(): void {
    this._loading.next(true);
  }

  /** Gọi để tắt spinner */
  hide(): void {
    this._loading.next(false);
  }
}
