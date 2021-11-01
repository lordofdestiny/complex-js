import Complex from "./complex.mjs";

const x = new Array(4)
  .fill(Math.random())
  .map((x) => (x + Math.random()) * 10 - 6);

const z1 = new Complex({ re: x[0], im: x[1] });
const z2 = new Complex({ re: x[2], im: x[3] });
const z3 = z1.pow(z2);

const z4a = z3.nthroot(6);

z4a.forEach((z, i) => {
  const mode = i % 2 == 0 ? Complex.PRINT_MODE.RECT : Complex.PRINT_MODE.POL;
  console.log(`${z.toString(mode)}`);
});
