import { Item } from './interfaces';

import BrowserWindow from './browser-window';

export default class Engine {
  private items: Array<Item>;
  private browserWindow: BrowserWindow;

  constructor() {
    this.items = [];

    this.browserWindow = new BrowserWindow();
  }

  spawn(item: Item): Engine {
    this.items.push(item);

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
    for (const item of this.items) {
      item.update(step, this.browserWindow.viewportRatio);
    }

    return this;
  };

  private render(): Engine {
    for (const item of this.items) {
      item.render(this.browserWindow)
    };

    return this;
  }
}
