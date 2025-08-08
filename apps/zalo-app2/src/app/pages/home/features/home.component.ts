import {Component, OnInit} from "@angular/core";
import {ProductShareService} from "../../../../../../../libs/share/services/global";
import {IResUserInfo} from "../../../../../../../libs/core/models/zmp.model";
import {UserService} from "../../../../../../../libs/core/services";
import {ZaloService} from "../../../../../../../libs/core/services/zalo-service/zalo.service";
import {AllScope} from "../../../../../../../libs/share/models/features/zmp.model";
import { openChat } from 'zmp-sdk/apis'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchQuery: any
  data: any
  userInfo!: IResUserInfo
  readonly phoneAndLocationScopes: AllScope[] = [
    'scope.userPhonenumber',
  ];

  slides = [
    {img: 'https://pos.nvncdn.com/bb0dce-101691/bn/20250630_0XODih0b.gif'},
    {img: 'https://pos.nvncdn.com/bb0dce-101691/bn/20250616_uSejxViY.gif'},
    {img: 'https://pos.nvncdn.com/bb0dce-101691/bn/20250719_zCu4lyNa.gif'},
  ];

  constructor(
    private prdShareService: ProductShareService,
    private userService: UserService,
    private zmpService: ZaloService
  ) {
    this.userService.userInfo$
      .subscribe(info => {
        if (info) {
          this.userInfo = info;
        }
      });
  }

  ngOnInit() {


    this.prdShareService.getHomeProducts().subscribe({
      next: res => {
        const productList = res.data
      }
    })
  }

  async grantPermission() {
    this.zmpService
      .authorizeAndFetchUser$(this.phoneAndLocationScopes)
      .subscribe(({perms, userInfo}) => {
        console.log('Perms:', perms);
        if (userInfo) {
          this.userInfo = userInfo;
          this.userService.saveGrantAndUser(perms, userInfo);
          console.log('User Info:', userInfo);
        } else {
          console.warn('Chưa có hoặc lấy userInfo thất bại');
        }
      });
  }

  openChat() {
    openChat({
      type: "user",
      id: "900441440596624596",
      message: `Xin chào`
    })
  }
}
