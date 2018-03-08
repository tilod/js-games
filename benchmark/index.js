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
  .add('Class test', () => {
    const instance = new AClass(7);
    instance.doSomething(12);
    instance.doSomething(30);
    instance.doSomething(4);
  })
  .add('Closure test', () => {
    const closure = AClosure(7);
    closure.doSomething(12);
    closure.doSomething(30);
    closure.doSomething(4);
  })
  .on('cycle', event => console.log(String(event.target)))
  .run();
