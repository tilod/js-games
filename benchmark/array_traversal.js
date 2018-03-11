const Benchmark = require('benchmark');

const array = [];
for (let i = 0; i < 100; ++i) array.push(i * 2);

new Benchmark.Suite()
  .add('foo-in-loop', () => {
    let sum = 0;
    for (let x in array) sum += x;
    return sum;
  })
  .add('forEach', () => {
    let sum = 0;
    array.forEach(x => sum += x);
    return sum;
  })
  .add('for with index', () => {
    let sum = 0;
    for (let j = 0; j < array.length; ++j) sum += array[j];
    return sum;
  })
  .on('cycle', event => console.log(String(event.target)))
  .run();
