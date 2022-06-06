import ROUTING from "./ROUTING";
import DEBUG from "./DEBUG";
import DEVICE from "./DEVICE";
import TIME from "./TIME";
import SIZES from "./SIZES";
/*---------------------------------------------
                APP CONTROLLER
-----------------------------------------------*/
export default class APP {
  constructor() {
    console.log("salope");
    this.ROUTING = new ROUTING();
    this.DEBUG = new DEBUG();
    this.DEVICE = new DEVICE();
    this.TIME = new TIME();
    this.SIZES = new SIZES();
  }
}
new APP();
