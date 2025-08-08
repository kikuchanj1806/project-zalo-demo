import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import {
  getAppInfo,
  getUserInfo,
  authorize,
  getSetting,
  openPermissionSetting
} from 'zmp-sdk/apis';
import type { GetSettingReturn } from 'zmp-sdk';

// Tất cả các scope hỗ trợ
export type AllScope =
  | 'scope.userInfo'
  | 'scope.userLocation'
  | 'scope.userPhonenumber'

@Injectable({ providedIn: 'root' })
export class ZaloService {
  // ... init/config SDK (init()) như trước ...

  /** Lấy thông tin app dưới dạng Observable */
  getAppInfo$(): Observable<any> {
    return from(getAppInfo({}));
  }

  /** Lấy thông tin user dưới dạng Observable */
  getUserInfo$(): Observable<any> {
    return from(getUserInfo({}));
  }

  /** Lấy trạng thái cấp quyền hiện tại */
  getPermissionSettings$(): Observable<GetSettingReturn> {
    return from(getSetting({}));
  }

  /** Mở giao diện cài đặt quyền cho user */
  openPermissionSetting$(): Observable<any> {
    return from(openPermissionSetting({} as any));
  }

  /**
   * Xin các scope cần thiết và trả về map scope=>granted
   * Áp dụng Best Practices:
   * 1) Dùng getSetting() để kiểm tra trước
   * 2) Chỉ request các scope thiếu, giải thích rõ lý do
   * 3) Bắt lỗi code -201 khi user từ chối
   * @param scopes Mảng các scope thuộc AllScope
   */
  authorizeScopes$(
    scopes: AllScope[]
  ): Observable<Record<AllScope, boolean>> {
    return from(getSetting({})).pipe(
      switchMap((settings: GetSettingReturn) => {
        // Cast authSetting thành kiểu mở rộng
        const authSetting = settings.authSetting as Partial<Record<AllScope, boolean>>;
        // Lọc các scope chưa được cấp
        const toRequest = scopes.filter(scope => !authSetting[scope]);
        if (!toRequest.length) {
          // Đã có đủ quyền
          return of(authSetting as Record<AllScope, boolean>);
        }
        // Yêu cầu cấp quyền cho các scope thiếu
        return from(authorize({ scopes: toRequest as AllScope[] })).pipe(
          map((result) => ({ ...authSetting, ...result } as Record<AllScope, boolean>)),
          catchError((error: any) => {
            const code = error.code;
            if (code === -201) {
              console.warn('Người dùng đã từ chối cấp quyền cho', toRequest);
            } else {
              console.error('Lỗi khi yêu cầu cấp quyền', error);
            }
            // Trả về authSetting cũ nếu lỗi
            return of(authSetting as Record<AllScope, boolean>);
          })
        );
      })
    );
  }

  authorizeAndFetchUser$(
    scopes: AllScope[]
  ): Observable<{
    perms: Record<AllScope, boolean>;
    userInfo: any | null;
  }> {
    return this.authorizeScopes$(scopes).pipe(
      switchMap(perms => {
        const allGranted = scopes.every(s => perms[s]);
        if (!allGranted) {
          // nếu thiếu thì thôi, trả về luôn
          return of({ perms, userInfo: null });
        }
        // nếu đã được cấp hết, gọi getUserInfo()
        return from(getUserInfo()).pipe(
          map(res => ({
            perms,
            userInfo: res.userInfo
          })),
          catchError(err => {
            console.error('Lỗi getUserInfo()', err);
            return of({ perms, userInfo: null });
          })
        );
      })
    );
  }
}
