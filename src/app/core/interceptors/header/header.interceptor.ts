import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PlatformService } from '../../services/platform/platform.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  let platformService : PlatformService = inject(PlatformService);
  
  if (platformService.isBrowserSide()) {   
    if (localStorage.getItem('userToken')) {
      let tokenHeader : any = {token : localStorage.getItem('userToken')}
      req = req.clone(
        {
          setHeaders : tokenHeader
        }
      )    
    }
  }
  return next(req);
};
