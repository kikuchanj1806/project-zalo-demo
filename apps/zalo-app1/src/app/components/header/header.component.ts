import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {IResUserInfo} from "../../../../../../libs/core/models/zmp.model";
import {UserService} from "../../../../../../libs/core/services";
import {filter, startWith, Subject, takeUntil} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

interface HandleDef {
  title?: string;
  logo?: boolean;
  back?: boolean;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    .header-color {
      background-color: #0b2e69;
      padding-bottom: .7rem !important;
    }

    .back-button {
      padding: 0.5rem;
      background-color: transparent;
      border: none;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 0.25rem;

      &:hover {
        background-color: rgba(255,255,255,0.1);
      }
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255,255,255,0.3);
      }


    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = '';
  showGreeting = true;
  showBack = false;
  userInfo!: IResUserInfo;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef,
  ) {}


  ngOnInit() {
    this.userService.userInfo$
      .pipe(
        filter((u): u is IResUserInfo => u != null),
        takeUntil(this.destroy$)
      )
      .subscribe(info => {
        this.userInfo = info;
        this.cd.markForCheck();
      });

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateHeader();
      this.cd.detectChanges();
    });
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild
      ? this.getDeepestRoute(route.firstChild)
      : route;
  }

  private updateHeader() {
    const deepest = this.getDeepestRoute(this.route.root);
    const handle = (deepest.snapshot.data['handle'] || {}) as any;
    this.showGreeting = handle.logo === true;

    if (!this.showGreeting) {
      this.title = handle.title || '';
      this.showBack = handle.back !== false && window.history.length > 1;
    }
  }

  onBack() {
    this.router.navigate(['../']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
