import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services';

export const authReverseGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isLoggedIn() ? router.navigate(['/todo']) : true;
};
