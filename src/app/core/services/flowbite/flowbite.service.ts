import { inject, Injectable } from '@angular/core';
import { PlatformService } from '../platform/platform.service';

@Injectable({
  providedIn: 'root',
})
export class FlowbiteService {
  private platformService : PlatformService = inject(PlatformService)

  loadFlowbite(callback: (flowbite: any) => void) {
    if (this.platformService.isBrowserSide()) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }
  }
}
