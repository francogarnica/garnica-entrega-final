import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.services';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('authGuard');
  console.log('Paso por el guard');

  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    map((isAuth) => {
      //si esta autenticado lo dejo ver la pantalla
      if (isAuth) return true;
      //Si no esta autenticado se lo manda al login
      return router.createUrlTree(['/auth/login']);
    })
  );
};
