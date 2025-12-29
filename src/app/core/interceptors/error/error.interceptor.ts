import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { PlatformService } from '../../services/platform/platform.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const toastrService : ToastrService = inject(ToastrService);
  let platformService : PlatformService = inject(PlatformService);
  
  if (platformService.isBrowserSide()) { 
    return next(req).pipe(
      catchError(
        (err) => {
          toastrService.error(err.error.error);
          return throwError( () => err );
        }
      )
    );
  }
  return next(req);

};
