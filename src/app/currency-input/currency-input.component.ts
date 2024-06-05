import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  template: `<input type="text" class="form-control" [value]="displayValue" (input)="onInput($event)" (blur)="onBlur()" [attr.placeholder]="placeholder" numericOnly>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true
    }
  ]
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';  // Asignar valor por defecto
  displayValue: string = '';

  private onChange: (value: number) => void = () => {};  // Asignar función por defecto
  private onTouched: () => void = () => {};  // Asignar función por defecto

  writeValue(value: number): void {
    if (value !== null && value !== undefined) {
      this.displayValue = this.formatNumber(value.toString());
    } else {
      this.displayValue = '';
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/[^0-9]/g, ''); // Eliminar cualquier carácter que no sea un dígito

    // Actualizar el valor formateado
    this.displayValue = this.formatNumber(rawValue);
    if (this.onChange) {
      this.onChange(Number(rawValue));
    }
  }

  onBlur(): void {
    this.onTouched();
  }

  private formatNumber(value: string): string {
    // Reemplazar los puntos por comas en los decimales
    value = value.replace('.', ',');
    // Agregar puntos como separadores de miles
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
