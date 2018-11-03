import { DeviceWindowService, WindowDetect } from "./device-window.service";
import { ServiceLocator } from "./locator.service";

export function Responsive(): ClassDecorator {
  return function (constructor: any) {
    const prototype = constructor.prototype;
    const originalHookInit = prototype.ngOnInit;
    constructor.prototype.ngOnInit = function (...args) {
      const windowService: DeviceWindowService = ServiceLocator.get<DeviceWindowService>(DeviceWindowService);
      if (windowService) {
        windowService.onResize.subscribe((windowDetect: WindowDetect) => windowDetect.apply(this));
        if (originalHookInit) {
          originalHookInit.apply(this, args);
        }
      } else {
        throw new Error(`Not injected WindowService in ${constructor.name} component`);
      }
    };
  };
}
