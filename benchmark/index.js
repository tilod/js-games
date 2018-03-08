const Benchmark = require('benchmark');

// ES6 class
class AClass {
  constructor(value) {
    this.value = value;
  }

  doSomething(other) {
    return this.value + other;
  }
}

// Closure
const AClosure = (value) => {
  const doSomething = (other) => {
    return value + other;
  }

  return { doSomething };
}

const suite = new Benchmark.Suite;

suite
  .add('Class test', () => new AClass(7).doSomething(12))
  .add('Closure test', () => AClosure(7).doSomething(12))
  .on('cycle', event => console.log(String(event.target)))
  .run();
