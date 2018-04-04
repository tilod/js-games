import BrowserWindow from './browser-window';
import View from '../view';

class World {
  constructor() {
    this.items = new Map();

    this.browserWindow = new BrowserWindow();
    this.view = new View();
  }

  spawn(key, klass) {
    this.items.set(key, new klass());
  }

  update(step) {
    this.items.forEach(item =>
      item.update(step, this.browserWindow.normalizedHeight())
    );

    this.view.draw(
      this.items.values(),
      this.browserWindow.scale(),
      this.browserWindow.viewportHeight()
    );
  }
}

export default World;
