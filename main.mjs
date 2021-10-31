import Complex from "./complex.mjs";

const x = new Array(4)
  .fill(Math.random())
  .map((x) => (x + Math.random()) * 10 - 6);

const z1 = new Complex({ re: x[0], im: x[1] });
const z2 = new Complex({ re: x[2], im: x[3] });
const z3 = z1.pow(z2);

Complex.printMode = 1;

const z4a = z3.nthroot(6);

z4a.forEach((z, i) => {
  Complex.printMode = 1;
  process.stdout.write(`${z} \t`);
  Complex.printMode = 0;
  console.log(`\t ${z.ln(i)}`);
});

console.log(arrayInit(0, 10, { step: 1, map: (x) => x * x + 1 }));

function arrayInit(first, count, { step = 1, map = Number }) {
  return Array.from(
    (function* () {
      if (count == 0) return;
      let i = first;
      do {
        yield map(i);
      } while ((i += step) < count);
    })()
  );
}

String.prototype.print = function () {
  console.log(this);
};

"Hello".replaceAll("l", "k").print();
