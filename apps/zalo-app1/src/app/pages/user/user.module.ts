import { NgModule } from '@angular/core';
import {UserRouting} from "./user.routing";
import {CommonModule} from "@angular/common";
import {UserComponent} from "./features/user/user.component";

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRouting
  ]
})
export class UserModule {}
