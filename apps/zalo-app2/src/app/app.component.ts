import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: '[id=app]',
  template: `<router-outlet></router-outlet>`,
  standalone: false,
  styles: [`
    :host { display: block; height: 100%; }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'fashion-app-2';
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      // đây là type-predicate: tells TS “nếu true thì evt is NavigationEnd”
      filter((evt): evt is NavigationEnd => evt instanceof NavigationEnd)
    ).subscribe(evt => {
      // TS now knows evt is NavigationEnd
      console.log('Navigated to:', evt.urlAfterRedirects);
    });
  }
}
