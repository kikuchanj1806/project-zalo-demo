import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ProductShareService} from "../../../../../../../libs/share/services/global";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .overflow-x-auto {
      overflow-x: auto;
    }

    .flex-col {
      flex-direction: column;
    }

    .w-70 {
      width: 70px;
    }

    .h-70 {
      height: 70px;
    }

    .rounded-full {
      border-radius: 9999px;
    }

    .object-cover {
      object-fit: cover;
    }

    .img-category {
      border: .5px solid rgb(0 0 0 / 0.15);
    }
  `]
})
export class HomeComponent implements OnInit {
  searchQuery: any
  data: any

  slides = [
    {img: 'https://pos.nvncdn.com/bb0dce-101691/bn/20250630_0XODih0b.gif'},
    {img: 'https://pos.nvncdn.com/bb0dce-101691/bn/20250616_uSejxViY.gif'},
    {img: 'https://pos.nvncdn.com/bb0dce-101691/bn/20250719_zCu4lyNa.gif'},
  ];

  constructor(
    private prdShareService: ProductShareService
  ) {
  }

  ngOnInit() {
    this.prdShareService.getHomeProducts().subscribe({
      next: res => {
        const productList = res.data
      }
    })
  }
}
