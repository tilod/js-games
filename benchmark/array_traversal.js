const Benchmark = require('benchmark');

const array = [];
for (let i = 0; i < 100; ++i) array.push(i);

new Benchmark.Suite()
  .add('foo...of loop ---', () => {
    let sum = 0;
    for (let x of array) sum += x;
    return sum;
  })
  .add('for with index ---', () => {
    let sum = 0;
    for (let j = 0; j < array.length; ++j) sum += array[j];
    return sum;
  })
  .add('forEach ---', () => {
    let sum = 0;
    array.forEach(x => sum += x);
    return sum;
  })
  .add('iterator ---', () => {
    let sum = 0;
    const iterator = array[Symbol.iterator]();
    while(true) {
      const {value, done} = iterator.next();
      if (done) break;
      sum += value;
    }
    return sum;
  })
  .on('cycle', event => console.log(String(event.target)))
  .run();
