import BrowserWindow from './browser-window';
import World from './world';

import { Item } from './interfaces';

export default class Engine {
  private browserWindow: BrowserWindow;
  private world: World;

  constructor() {
    this.browserWindow = new BrowserWindow();
    this.world = new World();
  }

  spawn(item: Item, tags: Array<String> = []): Engine {
    item.world = this.world;
    this.world.addItem(item, tags);

    return this;
  }

  start(): void {
    const loop = (timestamp: number): void => {
      this.browserWindow.update();

      this
        .update(timestamp - lastRender)
        .render();

      lastRender = timestamp;
      window.requestAnimationFrame(loop);
    };

    let lastRender = 0;
    window.requestAnimationFrame(loop);
  }

  // private --------

  private update(step: number): Engine {
    for (const item of this.world.getItems()) {
      item.update(step, this.browserWindow.viewportRatio);
    }

    return this;
  };

  private render(): Engine {
    for (const item of this.world.getItems()) {
      item.render(this.browserWindow)
    };

    return this;
  }
}
