import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then(m => m.HomeModule),
        data: {handle: {logo: true}}
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailModule),
        data: {handle: {title: 'Chi Tiết Sản Phẩm', back: true}}
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/user/user.module').then(m => m.UserModule)
      }
    ]
  },
  // Redirect bất kỳ đường dẫn không khớp nào về trang chủ
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
