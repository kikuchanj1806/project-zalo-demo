import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";

@Component({
  selector: 'app-c-search',
  template: `
    <div class="px-2">
      <div class="position-relative w-100">
        <input
          #input
          type="text"
          [placeholder]="placeholder"
          class="w-100 h-12 ps-4-5 pe-3 bg-section border-0 text-lg rounded-lg outline-none"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onBlur()"
        />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  `,
  styles: [`
    i.fa-magnifying-glass {
      position: absolute;
      top: .5rem;
      left: 0.75rem;
      font-size: 18px;
    }

    .bg-section {
      background-color: #f7f7f8;
    }

    .rounded-lg {
      border-radius: 0.5rem;
    }

    .h-12 {
      height: 2rem;
    }

    .ps-4-5 {
      padding-left: 3rem;
    }
  `]
})
export class SearchComponent implements OnInit {
  @Input() placeholder = 'Tìm kiếm';
  // Truy cập thẳng DOM input nếu cần
  @ViewChild('input', {static: true}) inputEl!: ElementRef<HTMLInputElement>;
  // Nội bộ giữ giá trị
  value = '';

  private onChange = (_: any) => {
  };
  private onTouched = () => {
  };


  ngOnInit() {

  }
  // Gọi khi người dùng nhập
  onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.value = v;
    this.onChange(v);
  }

  // Gọi khi blur
  onBlur() {
    this.onTouched();
  }

}
