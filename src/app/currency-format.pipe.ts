import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value == null) {
      return '';
    }

    // Convertir el valor a string si es un número
    const num = typeof value === 'number' ? value.toString() : value;

    // Separar la parte entera de la parte decimal
    const parts = num.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? ',' + parts[1] : '';

    // Formatear el número con puntos como separadores de miles y coma como separador decimal
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + decimalPart;
  }
}
