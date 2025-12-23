import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private pLATFORM_ID : Object = inject(PLATFORM_ID);

  isBrowserSide() : boolean
  {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return true;
    }
    return false;
  }
}
