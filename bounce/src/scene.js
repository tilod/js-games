class Scene {
  constructor() {
    this.items = new Map();
  }

  spawn(key, klass) {
    this.items.set(key, new klass(key));
  }

  update(step, height) {
    this.items.forEach(item => item.update(step, height));
  }

  draw(scale) {
    this.items.forEach(item => item.draw(scale));
  }
}

export default Scene;
