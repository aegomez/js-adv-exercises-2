// postponed sieve of Eratosthenes
// algorithm by Will Ness, Tim Peters, David Eppstein
// https://stackoverflow.com/a/10733621
function* sieve() {
  yield* [2, 3];
  const dict = {};
  const ps = sieve();
  ps.next();
  let prime = ps.next().value;
  let primeSquare = prime * prime;
  let step;
  let next;
  for (let n = 5; ; n += 2) {
    if (dict[n]) {
      step = dict[n];
      delete dict[n];
    } else if (n < primeSquare) {
      yield n;
      // eslint-disable-next-line no-continue
      continue;
    } else {
      step = 2 * prime;
      prime = ps.next().value;
      primeSquare = prime * prime;
    }
    next = n + step;
    while (next in dict) {
      next += step;
    }
    dict[next] = step;
  }
}

module.exports = sieve;
