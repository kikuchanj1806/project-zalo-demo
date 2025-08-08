import {
  Component,
  forwardRef,
  ViewChild,
  ElementRef,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
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
        top: 1rem;
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
        height: 3rem;
      }

      .ps-4-5 {
        padding-left: 3rem;
      }

  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBarComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements ControlValueAccessor {
  @Input() placeholder = 'Tìm kiếm';
  // Truy cập thẳng DOM input nếu cần
  @ViewChild('input', {static: true}) inputEl!: ElementRef<HTMLInputElement>;
  // Nội bộ giữ giá trị
  value = '';
  // Callbacks từ Angular forms
  private onChange = (_: any) => {
  };
  private onTouched = () => {
  };

  // ControlValueAccessor interface
  writeValue(val: string): void {
    this.value = val ?? '';
    if (this.inputEl) {
      this.inputEl.nativeElement.value = this.value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.inputEl.nativeElement.disabled = isDisabled;
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
