import gsap from "gsap";

export default class Cursor {
  constructor(options) {
    this.options = {
      container: options.container || "body",
      speed: options.speed || 0.7,
      ease: options.ease || "expo.out",
      visibleTimeout: options.visibleTimeout || 300,
    };

    this.body = document.querySelector(this.options.container);
    this.cursorElem = document.createElement("div");
    this.cursorElem.setAttribute("class", "cursor | js-cursor");
    this.cursorText = document.createElement("div");
    this.cursorText.setAttribute("class", "cursor__text");
    this.pointerElems = this.body.querySelectorAll("a,input,textarea,button");
    this.iframes = document.querySelectorAll("iframe");
    this.dataCursorElems = document.querySelectorAll("[data-cursor]");
    this.dataCursorTextElems = document.querySelectorAll("[data-cursor-text]");
    this.dataCursorStickElems = document.querySelectorAll(
      "[data-cursor-stick]"
    );
    this.init();
  }

  init() {
    this.cursorElem.appendChild(this.cursorText);
    this.body.append(this.cursorElem);
    this.events();
    this.move(-window.innerWidth, -window.innerHeight, 0);
  }

  events() {
    const self = this;
    this.body.addEventListener("mouseleave", () => {
      self.hide();
    });
    this.body.addEventListener("mouseenter", () => {
      self.show();
    });
    this.body.addEventListener("mousemove", (e) => {
      this.pos = {
        x: this.stick
          ? this.stick.x - (this.stick.x - e.clientX) * 0.15
          : e.clientX,
        y: this.stick
          ? this.stick.y - (this.stick.y - e.clientY) * 0.15
          : e.clientY,
      };
      this.update();
    });
    this.body.addEventListener("mousedown", () => {
      self.setState("cursor--active");
    });
    this.body.addEventListener("mouseup", () => {
      self.removeState("cursor--active");
    });
    [...this.pointerElems].forEach((item) => {
      item.addEventListener("mouseenter", () => {
        self.setState("cursor--pointer");
      });
    });
    [...this.pointerElems].forEach((item) => {
      item.addEventListener("mouseleave", () => {
        self.removeState("cursor--pointer");
      });
    });
    [...this.iframes].forEach((item) => {
      item.addEventListener("mouseenter", () => {
        self.hide();
      });
    });
    [...this.iframes].forEach((item) => {
      item.addEventListener("mouseleave", () => {
        self.show();
      });
    });
    [...this.dataCursorElems].forEach((item) => {
      item.addEventListener("mouseenter", () => {
        self.setState(item.dataset.cursor);
      });
    });
    [...this.dataCursorElems].forEach((item) => {
      item.addEventListener("mouseleave", () => {
        self.removeState(item.dataset.cursor);
      });
    });

    [...this.dataCursorTextElems].forEach((item) => {
      item.addEventListener("mouseenter", () => {
        self.setText(item.dataset.cursorText);
      });
    });

    [...this.dataCursorTextElems].forEach((item) => {
      item.addEventListener("mouseleave", () => {
        self.removeText();
      });
    });

    [...this.dataCursorStickElems].forEach((item) => {
      item.addEventListener("mouseenter", () => {
        self.setStick(item.dataset.cursorStick);
      });
    });

    [...this.dataCursorStickElems].forEach((item) => {
      item.addEventListener("mouseleave", () => {
        self.removeStick();
      });
    });
  }

  setState(state) {
    const classes = state.split(" ");
    [...classes].forEach((className) => {
      this.cursorElem.classList.add(className);
    });
  }

  removeState(state) {
    const classes = state.split(" ");
    [...classes].forEach((className) => {
      this.cursorElem.classList.remove(className);
    });
  }

  toggleState(state) {
    const classes = state.split(" ");
    [...classes].forEach((className) => {
      this.cursorElem.classList.toggle(className);
    });
  }

  setText(text) {
    this.cursorText.innerHTML = text;
    this.cursorElem.classList.add("cursor--text");
  }

  removeText() {
    this.cursorElem.classList.remove("cursor--text");
  }

  setStick(el) {
    const target = document.querySelector(el);
    const bound = target.getBoundingClientRect();
    this.stick = {
      y:
        bound.top +
        parseFloat(getComputedStyle(target, null).height.replace("px", "")) / 2,
      x:
        bound.left +
        parseFloat(getComputedStyle(target, null).width.replace("px", "")) / 2,
    };
    this.move(this.stick.x, this.stick.y, 5);
  }

  removeStick() {
    this.stick = false;
  }

  update() {
    this.move();
    this.show();
  }

  move(x, y, duration) {
    gsap.to(this.cursorElem, {
      x: x || this.pos.x,
      y: y || this.pos.y,
      force3D: true,
      overwrite: true,
      ease: this.options.ease,
      duration: this.visible ? duration || this.options.speed : 0,
    });
  }

  show() {
    if (this.visible) return;
    clearInterval(this.visibleInt);
    this.cursorElem.classList.add("cursor--visible");
    this.visibleInt = setTimeout(() => (this.visible = true));
  }

  hide() {
    clearInterval(this.visibleInt);
    this.cursorElem.classList.remove("cursor--visible");
    this.visibleInt = setTimeout(
      () => (this.visible = false),
      this.options.visibleTimeout
    );
  }
}

module.exports.Cursor = Cursor;
