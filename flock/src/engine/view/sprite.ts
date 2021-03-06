import BrowserWindow from "../browser-window";
import Point2D from "../geometry/point2d";

export default class Sprite {
  private htmlElement: HTMLElement;
  private dimensions: Point2D;

  constructor(
    parentElement: HTMLElement,
    cssClass: string,
    dimensions: Point2D,
  ) {
    this.dimensions = dimensions;
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = cssClass;

    this.htmlElement.style.position = 'absolute';
    this.htmlElement.style.top = '0';
    this.htmlElement.style.left = '0';

    parentElement.appendChild(this.htmlElement);
  }

  render(
    browserWindow: BrowserWindow,
    position: Point2D,
    heading: Point2D = null,
  ) {
    const screenX: number =
      (position.x - this.dimensions.x / 2) * browserWindow.viewportWidth;
    const screenY: number =
      browserWindow.viewportHeight -
        ((position.y + this.dimensions.y / 2) * browserWindow.viewportWidth);
    const rotation: number = heading ? -heading.orientationDeg() : 0;
    const scale: number =
      (this.dimensions.x * browserWindow.viewportWidth) /
        this.htmlElement.clientWidth;

    this.htmlElement.style.transform =
      `translate(${screenX}px, ${screenY}px)
       rotate(${rotation}deg)
       scale(${scale}, ${scale})`;
  }
}
