import BrowserWindow from './browser-window';
import World from './world';

import { Item } from './interfaces';

export default class Engine {
  private _browserWindow: BrowserWindow;
  private _world: World;

  constructor() {
    this._browserWindow = new BrowserWindow();
    this._world = new World();
  }


  spawn(
    itemConstructor: { new(world: World): Item },
    tags: Array<String> = []
  ): Engine {
    this._world.addItem(new itemConstructor(this._world), tags);

    return this;
  }

  start(): void {
    const loop = (timestamp: number): void => {
      this._browserWindow.update();

      const step = timestamp - lastRender;

      this
        .plan()
        .move(step)
        .render();

      lastRender = timestamp;
      window.requestAnimationFrame(loop);
    };

    let lastRender = 0;
    window.requestAnimationFrame(loop);
  }


  private plan(): Engine {
    for (const item of this._world.getItems()) {
      item.plan();
    }

    return this;
  };

  private move(step: number): Engine {
    for (const item of this._world.getItems()) {
      item.move(step, this._browserWindow.viewportRatio);
    }

    return this;
  };

  private render(): Engine {
    for (const item of this._world.getItems()) {
      item.render(this._browserWindow)
    };

    return this;
  }
}
