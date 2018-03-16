import BrowserWindow from './browser-window.js';
import View from './view';

class Scene {
  constructor() {
    this.items = new Map();

    this.browserWindow = new BrowserWindow();
    this.view = new View();
  }

  spawn(key, klass) {
    this.items.set(key, new klass(key));
  }

  update(step) {
    this.items.forEach(item =>
      item.update(step, this.browserWindow.normalizedHeight())
    );

    this.view.draw(this.items.values(), this.browserWindow.scale());
  }
}

export default Scene;
