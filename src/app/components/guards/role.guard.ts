import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginAdmin = () => {
  const router = inject(Router);
  const identityJSON = localStorage.getItem("rol");

  if (identityJSON) {
    const identity = JSON.parse(identityJSON);

    if (identity == "1") {
      return true;
    }
  }

  router.navigate(['home']);
  return false; 
};

export const loginUser = () => {
  const router = inject(Router);
  const identityJSON = localStorage.getItem("rol");

  if (identityJSON) {
    const identity = JSON.parse(identityJSON);

    if (identity == "3") {
      return true;
    }
  }

  router.navigate(['administrador']);
  return false; 
};

