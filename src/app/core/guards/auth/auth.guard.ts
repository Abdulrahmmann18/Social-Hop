import { inject } from '@angular/core';
import { PlatformService } from './../../services/platform/platform.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let platformService : PlatformService = inject(PlatformService)
  let router : Router = inject(Router);

  if (platformService.isBrowserSide()) {   
    if (localStorage.getItem('userToken')) {
      return true;
    }
  }
  else {
    return true;
  }
  return router.createUrlTree(['/auth/signin']);
};
