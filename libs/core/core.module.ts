// libs/core/src/lib/core.module.ts
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpInterceptorProviders} from "./interceptors";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

@NgModule({
  providers: [
    HttpInterceptorProviders,
    provideAnimationsAsync(),
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) throw new Error('CoreModule đã được import rồi');
  }
}
