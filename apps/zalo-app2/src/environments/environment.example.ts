/**
 * - Đây là file ENV mẫu để nhân bản chạy local, tránh tình trạng mọi người cần config riêng ở local đang bị ghi đè nhau
 * - Dev local và production sẽ copy từ file này
 *
 * - Steps:
 *    + Step 1: nhân bản file này => đổi tên sang "environment.ts"
 *    + Step 2: environment.apiUrl: điền link dev muốn call api tới
 *      + production: false
 *      + zaloBaseHref: '/'
 * - Steps Production:
 *    + Step 1: nhân bản file này => đổi tên sang "environment.prod.ts"
 *    + Step 2: environment.apiUrl: điền link dev muốn call api tới
 *      + production: true
 *      + zaloBaseHref: '/zapps/app-id/'
 * */

export const environment = {
  production: true,
  zaloBaseHref: '',
  apiUrl: 'https://tunglxpos.bot3s.com',
  apiConfig: {
    version: '3.0',
    appId: '1011',
    businessId: 35102
  }
};
