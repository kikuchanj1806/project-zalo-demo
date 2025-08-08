import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {SpinnerService} from "../../../../../libs/core/services/spinner.service";

@Component({
  selector: 'app-home',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false
})
export class LayoutComponent implements OnInit {
  isLoading$ = this.spinner.isLoading$;

  constructor(
    private spinner: SpinnerService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.isLoading$.subscribe(_ => {
      // báo Angular re-check sau khi giá trị loading thay đổi
      this.cd.markForCheck();
    });
  }
}
