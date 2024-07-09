import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  handleError(error: HttpErrorResponse): void {
    if (error.status === 429) {
      console.error('Too many requests. Reloading the page...');
      setTimeout(() => {
        window.location.reload();
      }, 5000); // Esperar 5 segundos antes de recargar la página
    } else {
      console.error('An error occurred:', error);
    }
  }
}
