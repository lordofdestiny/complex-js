import Tools from "./tools.mjs";
export default class Complex {
  #re;
  #im;
  #r;
  #arg;
  static #printMode = Complex.PRINT_MODE.RECT;
  static Zero = new Complex();
  constructor({ re, im, r, arg } = { re: 0, im: 0 }) {
    if (re !== undefined && im !== undefined) {
      this.#re = re;
      this.#im = im;
      this.#r = Math.hypot(re, im);
      this.#arg = Math.atan2(im, re);
    } else if (r !== undefined && arg !== undefined) {
      this.#re = r * Math.cos(arg);
      this.#im = r * Math.sin(arg);
      this.#r = r;
      this.#arg = arg;
    } else {
      throw new Error("Wrong arguments supplied!");
    }
  }

  static get PRINT_MODE() {
    return {
      get POL() {
        return "polar";
      },
      get RECT() {
        return "rectangular";
      },
    };
  }

  static setPrintMode(mode) {
    switch (mode) {
      case this.PRINT_MODE.RECT:
      case this.PRINT_MODE.POL:
        this.#printMode = mode;
        break;
      default:
        throw new Error("Invalid print mode set!");
    }
  }

  static getPrintMode() {
    return this.#printMode;
  }

  #wrapArg(arg) {
    return Math.atan2(Math.sin(arg), Math.cos(arg));
  }

  #updateRect() {
    this.#re = this.Mag * Math.cos(this.Arg);
    this.#im = this.Mag * Math.sin(this.Arg);
  }

  #updatePolar() {
    this.#r = Math.hypot(this.Re, this.Im);
    this.#arg = Math.atan2(this.Im, this.Re);
  }

  get Re() {
    return this.#re;
  }

  set Re(value) {
    this.#re = value;
    this.#updatePolar();
  }

  get Im() {
    return this.#im;
  }

  set Im(value) {
    this.#im = value;
    this.#updatePolar();
  }

  get Mag() {
    return this.#r;
  }

  set Mag(value) {
    this.#r = value;
    this.#updateRect();
  }

  get Arg() {
    return this.#arg;
  }

  set Arg(value) {
    this.#arg = value;
    this.#updateRect();
  }

  wrapArgument() {
    this.Arg = this.#wrapArg(this.Arg);
  }

  add(z) {
    const re = this.Re + z.Re;
    const im = this.Im + z.Im;
    return new Complex({ re, im });
  }

  sub(z) {
    const re = this.Re - z.Re;
    const im = this.Im - z.Im;
    return new Complex({ re, im });
  }

  mul(z) {
    const r = this.Mag * z.Mag;
    const arg = this.Arg + z.Arg;
    return new Complex({ r, arg });
  }

  div(z) {
    const r = this.Mag / z.Mag;
    const arg = this.Arg - z.Arg;
    return new Complex({ r, arg });
  }

  conj() {
    return new Complex({ re: this.#re, im: -this.#im });
  }

  pow(z) {
    const oldMag = this.Mag;
    const oldArg = this.Arg;
    const newMag = oldMag ** z.Re * Math.exp(-oldArg * z.Im);
    const newArg = oldArg * z.Re + z.Im * Math.log(oldMag);
    return new Complex({ r: newMag, arg: newArg });
  }

  nthroot(n) {
    const newMag = this.Mag ** 1 / n;
    const arr = new Array(n).fill(0);
    return arr.map(
      (_, k) =>
        new Complex({ r: newMag, arg: (this.Arg + 2 * Math.PI * k) / n })
    );
  }

  ln(branch = 0) {
    return new Complex({
      re: Math.log(this.Mag),
      im: this.Arg + 2 * branch * Math.PI,
    });
  }

  toString(mode = Complex.PRINT_MODE.RECT) {
    const printMode = mode ?? Complex.#printMode;
    if (printMode == Complex.PRINT_MODE.RECT) {
      return `${this.Re.toFixed(6)} ${Tools.signSymbol(this.Im)}${Math.abs(
        this.Im
      ).toFixed(6)}i`;
    } else if (printMode == Complex.PRINT_MODE.POL) {
      return `${this.Mag.toFixed(6)} * e^(i* ${this.Arg.toFixed(6)})`;
    } else {
      throw new Error("Invalid print mode!");
    }
  }
}
