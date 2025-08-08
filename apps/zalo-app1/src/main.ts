import {AppModule} from "./app/app.module";
import 'zone.js';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
