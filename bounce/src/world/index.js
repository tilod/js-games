import BrowserWindow from './browser-window';
import Physics from '../physics';
import View from '../view';

class World {
  constructor() {
    this.items = new Map();

    this.physics = new Physics();
    this.browserWindow = new BrowserWindow();
    this.view = new View();
  }

  spawn(key, klass, options = {}) {
    this.items.set(key, new klass(options));
  }

  update(step) {
    this.items.forEach(item =>
      item.update(step, this.browserWindow.normalizedHeight())
    );

    // REFACTOR to Physics
    // ---- >8 ----
    const collisions = [];
    const blue = this.items.get('blue-ball');
    const red = this.items.get('red-ball');
    if (this.physics.doCollide(blue.position, blue.size, red.position, red.size)) {
      if (!blue.colliding && !red.colliding) {
        blue.colliding = true;
        red.colliding = true;
        collisions.push([blue, red]);
      }
    } else {
      blue.colliding = false;
      red.colliding = false;
    }
    // ---- 8< ----

    this.physics.reflect(collisions);

    this.view.draw(
      this.items.values(),
      this.browserWindow.scale(),
      this.browserWindow.viewportHeight()
    );
  }
}

export default World;
