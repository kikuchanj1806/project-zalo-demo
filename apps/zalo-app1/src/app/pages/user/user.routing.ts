import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./features/user/user.component";

const routes: Routes = [
  {
    path: 'profile',
    component: UserComponent,
    data: { handle: { logo: true } }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting {}
