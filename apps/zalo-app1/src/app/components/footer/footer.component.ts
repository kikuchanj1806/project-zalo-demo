import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {filter, startWith, Subject, takeUntil} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import { openChat } from 'zmp-sdk/apis'

export interface FooterItem {
  path: string;
  iconClass: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer w-100">
      <ng-container *ngIf="!isProductDetail; else detailTpl">
        <!-- footer bình thường -->
        <nav
          class="w-100 p-2 pb-3 grid footer-nav"
          style="padding-bottom: max(16px, env(safe-area-inset-bottom));"
        >
          <a
            *ngFor="let item of items"
            [routerLink]="item.path"
            routerLinkActive="active"
            class="d-flex flex-col align-items-center space-y-0.5 p-1 pb-0.5 cursor-pointer"
          >
            <i [ngClass]="item.iconClass" class="f-6"></i>
            <span class="text-2xs">{{ item.label }}</span>
          </a>
        </nav>
      </ng-container>

      <ng-template #detailTpl>
        <!-- footer cho màn hình chi tiết sản phẩm -->
        <div class="row nav-item_nav pt-2 pb-3 align-items-center">
          <div class="col-2">
            <div class="chat_zalo" (click)="openChat()">
              <img
                [src]="'assets/img/logo_zalo.svg'"
                alt="Zalo"
                class="logo-zalo-size"
              />
              <div class="zalo-chat_text mt-1">Chat ngay</div>
            </div>
          </div>
          <div class="col-5">
            <button type="button" class="btn add-to-cart w-100 py-2">
              Thêm vào giỏ
            </button>
          </div>
          <div class="col-5">
            <button type="button" class="btn buy-now w-100 py-2">
              Mua ngay
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent implements OnInit, OnDestroy {
  /**
   * Array of navigation items; default example set
   */
  @Input() items: FooterItem[] = [
    {path: '/', iconClass: 'fal fa-house', label: 'Trang chủ'},
    {path: '/categories', iconClass: 'fal fa-th', label: 'Danh mục'},
    {path: '/cart', iconClass: 'fal fa-shopping-cart', label: 'Giỏ hàng'},
    {path: '/user/profile', iconClass: 'fal fa-user', label: 'Thành viên'}
  ];
  isProductDetail = false;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith<NavigationEnd | null>(null),
      takeUntil(this.destroy$)
    ).subscribe((e: NavigationEnd | null) => {
      const url = e?.urlAfterRedirects ?? this.router.url;
      this.isProductDetail = url.startsWith('/product');
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openChat() {
    openChat({
      type: "user",
      id: "900441440596624596",
      message: `Xin chào`
    })
  }
}
