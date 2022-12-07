import Cursor from "./Cursor";
import Magnetic from "./Magnetic";

export default class DynamicCursor {
  constructor(options) {
    this.options = options;
    // Init cursor
    const defaultOptions = {
      magneticElems:
        typeof options.magneticElms !== "undefined"
          ? options.magneticElms
          : document.querySelectorAll("[data-magnetic]"),
    };

    this.initCursor(options);

    [...defaultOptions.magneticElems].forEach((magneticItem) => {
      window.cursor.magnetic = new Magnetic(magneticItem);
      Magnetic();
    });
  }

  initCursor() {
    window.cursor = new Cursor(this.options);
  }
}
