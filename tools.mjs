export function arrayInit(first, count, { step = 1, map = Number }) {
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
