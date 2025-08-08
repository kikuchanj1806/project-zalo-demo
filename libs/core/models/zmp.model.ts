/** getAppInfo */
export interface IResAppInfo {
  appUrl: string
  description: string
  name: string
  qrCodeUrl: string
  version: string
  logoUrl: string
}

/** getAppInfo
 * https://mini.zalo.me/documents/api/getUserInfo/
 * */
export interface IUserInfoParams {
  autoRequestPermission?: boolean,
  avatarType?: "small" | "normal" | "large"
}
export interface IResUserInfo {
  avatar: string
  followedOA: boolean,
  id: string,
  idByOA: string,
  isSensitive: boolean,
  name: string
}
