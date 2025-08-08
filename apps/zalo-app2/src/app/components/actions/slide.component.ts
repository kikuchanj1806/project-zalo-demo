import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
export interface ISlideConfig {
  showNavigation?: boolean;
  showPagination?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
}

@Component({
  selector: 'app-slide',
  template: `
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div *ngFor="let item of items" class="swiper-slide">
          <div class="relative">
            <img [src]="item.img" alt="{{ item.title }}" class="w-100 rounded-lg"/>
          </div>
        </div>
      </div>

      <div *ngIf="config.showPagination" class="swiper-pagination"></div>
      <ng-container *ngIf="config.showNavigation">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </ng-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: auto;
    }

    .mySwiper {
      width: 100%;
      height: 100%;

      img {
        max-width: 100%;
        height: auto;
      }

      //.rounded-lg {
      //  border-radius: 0.5rem;
      //}
    }
  `]
})
export class SlideComponent implements OnInit, OnDestroy {
  @Input() items: Array<{ img: string; title?: string }> = [];
  @Input() config: ISlideConfig = {
    showNavigation: true,
    showPagination: true,
    autoplay: false,
    autoplayDelay: 3000,
    loop: true
  };

  swiper!: any;

  ngOnInit() {
    import('swiper').then(({default: Swiper}) => {
      // Destroy existing swiper instance if any
      if (this.swiper) {
        this.swiper.destroy();
      }

      this.swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        autoplay: {
          delay: 2000,
        },
        navigation: this.config.showNavigation ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        } : false,
        pagination: {el: '.swiper-pagination', type: 'bullets',},
      });
    });
  }


  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy();
    }
  }
}
