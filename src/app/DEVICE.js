import MobileDetect from "mobile-detect";
import Emit from "utils/Emit";
/*---------------------------------------------------------------------------------------
    DEVICE CONTROLLER EMIT THE TYPE OF DEVICE & GET ORIENTATION & DEVICE MOTION
------------------------------------------------------------------------------------------*/
class DEVICE {
  constructor() {
    this.userAgent = window.navigator.userAgent;
    this.mobileDetect = new MobileDetect(this.userAgent);
    window.DEVICE = {};
    this.GetOrientation();

    Emit.Emitter.on(Emit.EmitEvent.SIZES, () => {
      window.setTimeout(() => {
        this.GetOrientation();
        Emit.Emitter.emit(Emit.EmitEvent.DEVICE_ORIENTATION, window.DEVICE);
      }, 100);
    });

    if (window.DEVICE.device === "Tablet" || window.DEVICE.device === "Mobile") {
      window.addEventListener("orientationchange", this.UpdateOrientation.bind(this), false);
      window.addEventListener("devicemotion", (e) => this.UpdateMotion(e), false);
    }
  }

  GetOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      this.orientation = "portrait";
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      this.orientation = "landscape";
    }

    window.DEVICE = {
      device: this.GetDeviceType(),
      orientation: this.orientation,
      width: screen.availWidth,
      height: screen.availHeight,
    };
    if (window.DEVICE.device === "Desktop") {
      document.body.classList.add("Desktop");
    } else {
      document.body.classList.add("Mobile");
    }
  }

  GetDeviceType() {
    if (this.mobileDetect.tablet()) {
      return "Tablet";
    } else if (this.mobileDetect.mobile()) {
      return "Mobile";
    } else {
      return "Desktop";
    }
  }
  UpdateMotion(e) {
    let x = {
      Alpha: e.rotationRate.alpha,
      Beta: e.rotationRate.beta,
      Gamma: e.rotationRate.gammax,
      AcceleX: e.accelerationIncludingGravity.X,
      AcceleY: e.accelerationIncludingGravity.Y,
      AcceleZ: e.accelerationIncludingGravity.Z,
    };

    Emit.Emitter.emit(Emit.EmitEvent.DEVICE_MOTION, x);
  }
  UpdateOrientation() {
    window.setTimeout(() => {
      this.GetOrientation();
      Emit.Emitter.emit(Emit.EmitEvent.DEVICE_ORIENTATION, window.DEVICE);
    }, 1);
  }
  isIE() {
    return (
      this.userAgent.indexOf("MSIE ") > 0 ||
      this.userAgent.indexOf("Trident/") > 0 ||
      this.userAgent.indexOf("Edge/") > 0
    );
  }
}

export default DEVICE;
