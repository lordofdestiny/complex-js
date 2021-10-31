function signSymbol(number) {
  return String.fromCharCode(44 - Math.sign(number));
}

class Complex {
  constructor({ re, im, r, arg }) {
    if (re !== undefined && im !== undefined) {
      this._re = re;
      this._im = im;
      this._r = this._magnitude(re, im);
      this._arg = this._argument(re, im);
    } else if (r !== undefined && arg !== undefined) {
      this._r = r;
      this._arg = arg;
      this._re = this._r * Math.cos(this._arg);
      this._im = this._r * Math.sin(this._arg);
    } else {
      throw new Error("Wrong arguments supplied!");
    }
  }

  _magnitude(a, b) {
    return Math.hypot(a, b);
  }

  _argument(a, b) {
    return Math.atan2(b, a);
  }

  _wrapArg(arg) {
    return this._argument(Math.cos(arg), Math.sin(arg));
  }

  _updateRect() {
    this._re = this.Mag * Math.cos(this.Arg);
    this._im = this.Mag * Math.sin(this.Arg);
  }

  _updatePolar() {
    this._mag = (this.Re ** 2 + this.Im ** 2) ** 0.5;
    this._arg = this._argument(this.Re, this.Im);
  }

  get Re() {
    return this._re;
  }

  set Re(value) {
    this._re = value;
    this._updatePolar();
  }

  get Im() {
    return this._im;
  }

  set Im(value) {
    this._im = value;
    this._updatePolar();
  }

  get Mag() {
    return this._r;
  }

  set Mag(value) {
    this._r = value;
    this._updateRect();
  }

  get Arg() {
    return this._arg;
  }

  set Arg(value) {
    this._arg = value;
    this._updateRect();
  }

  wrapArgument() {
    this.Arg = this._wrapArg(this.Arg);
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
    return new Complex({ re: this._re, im: -this._im });
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
    const a = new Array(n).fill(0);
    return a.map(
      (_, k) =>
        new Complex({ r: newMag, arg: (this.Arg + 2 * Math.PI * k) / n })
    );
  }

  ln(k = 0) {
    return new Complex({
      re: Math.log(this.Mag),
      im: this.Arg + 2 * k * Math.PI,
    });
  }

  toString() {
    if (Complex.printMode == 0) {
      return `${this.Re.toFixed(6)} ${signSymbol(this.Im)}${Math.abs(
        this.Im
      ).toFixed(6)}i`;
    } else {
      return `${this.Mag.toFixed(6)} * e^(i* ${this.Arg.toFixed(6)} )`;
    }
  }
}
Complex.printMode = 0;

export default Complex;
