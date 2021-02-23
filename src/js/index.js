import Cursor from "./Cursor";
import Magnetic from "./Magnetic";

export default (options) => {
  // Init cursor
  const defaultOptions = {
    magneticElems:
      options.magneticElms || document.querySelectorAll("[data-magnetic]"),
  };
  window.cursor = new Cursor(options);

  [...defaultOptions.magneticElems].forEach((magneticItem) => {
    window.cursor.magnetic = new Magnetic(magneticItem);
    Magnetic();
  });
};
