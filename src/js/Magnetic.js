import gsap from "gsap";

export default class Magnetic {
  constructor(el) {
    this.el = el;
    this.options = {
      y: 0.2,
      x: 0.2,
      s: 0.2,
      rs: 0.7,
    };

    this.y = 0;
    this.x = 0;
    this.width = 0;
    this.height = 0;

    if (this.el.dataset.magneticInit) return;
    this.el.dataset.magneticInit = true;

    this.bind();
  }

  bind() {
    this.el.addEventListener("mouseenter", () => {
      const bounds = this.el.getBoundingClientRect();
      this.y = bounds.top - window.pageYOffset;
      this.x = bounds.left - window.pageXOffset;
      this.width = this.el.offsetWidth;
      this.height = this.el.offsetHeight;
    });

    this.el.addEventListener("mousemove", (e) => {
      const y = (e.clientY - this.y - this.height / 2) * this.options.y;
      const x = (e.clientX - this.x - this.width / 2) * this.options.x;

      this.move(x, y, this.options.s);
    });

    this.el.addEventListener("mouseleave", () => {
      this.move(0, 0, this.options.rs);
    });
  }

  move(x, y, speed) {
    gsap.to(this.el, {
      y,
      x,
      force3D: true,
      overwrite: true,
      duration: speed,
    });
  }
}
