const Benchmark = require('benchmark');

// array
const buildArray = (zero, one, two) => [zero, one, two];

// object
const buildObject = (zero, one, two) => {
  return {
    zero: zero,
    one: one,
    two: two
  };
};

// class
class Klass {
  constructor(zero, one, two) {
    this.zero = zero;
    this.one = one;
    this.two = two;
  }
}

new Benchmark.Suite()
  .add('array', () => {
    const array = buildArray(2, 4, 8);
    array[0];
    array[1];
    array[2];
    array[0];
  })
  .add('object', () => {
    const object = buildObject(2, 4, 8);
    object.zero;
    object.one;
    object.two;
    object.zero;
  })
  .add('class', () => {
    const klass = new Klass(2, 4, 8);
    klass.zero;
    klass.one;
    klass.two;
    klass.zero;
  })
  .on('cycle', event => console.log(String(event.target)))
  .run();
