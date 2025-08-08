// apps/zalo-app1/src/app/shared/spinner/app-spinner.component.ts
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div *ngIf="loading" class="cssload-container h-100 w-100 {{ position }}" [style.opacity]="opacity">
      <div class="cssload-speeding-wheel"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class AppSpinnerComponent {
  /** Điều khiển hiển thị spinner */
  @Input() loading = false;
  /** Độ mờ của overlay (0–1) */
  @Input() opacity = 1;
  /** position-absolute / fixed tuỳ nhu cầu */
  @Input() position = 'position-absolute';
}
