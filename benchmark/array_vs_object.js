const Benchmark = require('benchmark');

// direct assignment
class WithDirectAssignment {
  constructor(zero, one, two) {
    this.zero = zero;
    this.one = one;
    this.two = two;
  }
}

// array
class WithArray {
  constructor(zero, one, two) {
    this.array = [zero, one, two];
  }
}

// object
class WithObject {
  constructor(zero, one, two) {
    this.object = { zero: zero, one: one, two: two };
  }
}

// inner class
class WithInnerClass {
  constructor(zero, one, two) {
    this.innerClass = new WithDirectAssignment(zero, one, two);
  }
}

new Benchmark.Suite()
  .add('no class ---', () => {
    const zero = 2;
    const one = 4;
    const two = 8;
    return zero + one + two + zero;
  })
  .add('direct assignment ---', () => {
    const directAssignment = new WithDirectAssignment(2, 4, 8);
    return directAssignment.zero +
      directAssignment.one +
      directAssignment.two +
      directAssignment.zero;
  })
  .add('array ---', () => {
    const withArray = new WithArray(2, 4, 8);
    return withArray.array[0] +
      withArray.array[1] +
      withArray.array[2] +
      withArray.array[0];
  })
  .add('object ---', () => {
    const withObject = new WithObject(2, 4, 8);
    return withObject.object.zero +
      withObject.object.one +
      withObject.object.two +
      withObject.object.zero;
  })
  .add('class ---', () => {
    const withInnerClass = new WithInnerClass(2, 4, 8);
    return withInnerClass.innerClass.zero +
      withInnerClass.innerClass.one +
      withInnerClass.innerClass.two +
      withInnerClass.innerClass.zero;
  })
  .on('cycle', event => console.log(String(event.target)))
  .run();
