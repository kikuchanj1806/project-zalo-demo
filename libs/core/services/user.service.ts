import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable, of} from 'rxjs';
import {getSetting, nativeStorage} from 'zmp-sdk/apis';
import {STORAGE_KEYS} from '../models/storage.model';
import {IResUserInfo} from "../models/zmp.model";

@Injectable({providedIn: 'root'})
export class UserService {
  private _userInfo$ = new BehaviorSubject<IResUserInfo | null>(null);
  readonly userInfo$: Observable<IResUserInfo | null> = this._userInfo$.asObservable();

  private _grantedScopes: Set<string> = new Set();

  constructor() {
    this.checkAndLoadCache().then();
  }

  /**
   * 1) Check lại permission hiện tại
   * 2) Nếu có scope cũ bị revoke thì clear cache
   * 3) Ngược lại mới load scopes + userInfo từ nativeStorage
   */
  private async checkAndLoadCache(): Promise<void> {
    try {
      const settings = await getSetting({});
      const authSetting = settings.authSetting as Record<string, boolean>;

      const scopesJson = nativeStorage.getItem(STORAGE_KEYS.GRANTED_SCOPES);
      console.log('scopesJson', scopesJson)
      const storedScopes: string[] = scopesJson ? JSON.parse(scopesJson) : [];

      const revoked = storedScopes.filter(scope => !authSetting[scope]);
      if (revoked.length > 0) {
        this.clearCache();
        return;
      }

      storedScopes.forEach(s => this._grantedScopes.add(s));
      const userJson = nativeStorage.getItem(STORAGE_KEYS.USER_INFO);
      if (userJson) {
        const info: IResUserInfo = JSON.parse(userJson);
        this._userInfo$.next(info);
      }
    } catch (e) {
      console.log('UserService.checkAndLoadCache failed', e);
      this.clearCache();
    }
  }

  /** Lưu granted scopes và userInfo vào nativeStorage + BehaviorSubject */
  saveGrantAndUser(
    granted: Record<string, boolean>,
    info: IResUserInfo
  ): void {
    // 1) Lưu scopes
    const scopes = Object.keys(granted).filter(s => granted[s]);
    try {
      nativeStorage.setItem(
        STORAGE_KEYS.GRANTED_SCOPES,
        JSON.stringify(scopes)
      );
      this._grantedScopes = new Set(scopes);
    } catch (e) {
      console.error('Failed to cache grantedScopes', e);
    }

    // 2) Lưu userInfo
    try {
      nativeStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(info));
      this._userInfo$.next(info);
    } catch (e) {
      console.error('Failed to cache userInfo', e);
    }
  }

  /** Xóa cache khi logout hoặc user thu hồi quyền */
  clearCache(): void {
    try {
      nativeStorage.removeItem(STORAGE_KEYS.GRANTED_SCOPES);
    } catch {
    }
    try {
      nativeStorage.removeItem(STORAGE_KEYS.USER_INFO);
    } catch {
    }
    this._grantedScopes.clear();
    this._userInfo$.next(null);
  }

  /** Trả về các scopes đã được cấp (loadCache hoặc sau authorize) */
  getGrantedScopes(): string[] {
    return Array.from(this._grantedScopes);
  }
}
