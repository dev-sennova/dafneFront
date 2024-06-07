import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[numericOnly]'
})
export class NumericOnlyDirective {
  private maxDigits: number = 9; // Cambiado a 10 para que se active después del décimo dígito

  @Output() numberTooLarge: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Emit event if the number of digits exceeds the limit
    if (value.length > this.maxDigits) {
      this.numberTooLarge.emit(true);
    } else {
      this.numberTooLarge.emit(false);
    }

    // Count only digits (ignore dots)
    const digitsOnly = value.replace(/\./g, '');
    if (digitsOnly.length > this.maxDigits) {
      value = digitsOnly.substring(0, this.maxDigits);
    }

    // Add thousands separators
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    input.value = value;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];
    const key = event.key;

    if (allowedKeys.includes(key)) {
      return;
    }

    if ((key < '0' || key > '9')) {
      event.preventDefault();
    }
  }
}
