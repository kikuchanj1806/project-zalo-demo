import {Component, OnInit} from "@angular/core";
import {ZaloService} from "../../../../../../../../libs/core/services/zalo-service/zalo.service";
import {IResAppInfo, IResUserInfo} from "../../../../../../../../libs/core/models/zmp.model";
import {AllScope} from "../../../../../../../../libs/share/models/features/zmp.model";
import {UserService} from "../../../../../../../../libs/core/services";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  appInfo!: IResAppInfo; // Thông tin app
  userInfo!: IResUserInfo; // Thông tin app
  readonly phoneAndLocationScopes: AllScope[] = [
    'scope.userPhonenumber',
  ];
  constructor(
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
    this.zmpService.getAppInfo$().subscribe({
      next: res => {
        this.appInfo = res as IResAppInfo;
      }
    })
  }

  async grantPermission() {
    this.zmpService
      .authorizeAndFetchUser$(this.phoneAndLocationScopes)
      .subscribe(({ perms, userInfo }) => {
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
}
