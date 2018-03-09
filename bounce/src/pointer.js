import MathHelper from './math-helper.js';

class Pointer {
  static RADIUS = 100;
  static SPEED = 200;

  constructor() {
    this.element = document.createElement('div');

    this.rotation = 0;
    this.positionX = Pointer.RADIUS;
    this.positionY = Pointer.RADIUS;
    this.heading = Math.PI / 4; // 45°

    this.element.innerHTML = '&uarr;';
    this.element.style.backgroundColor = 'darkblue';
    this.element.style.borderRadius = '50%';
    this.element.style.color = 'white';
    this.element.style.fontFamily = 'Helvetica Neue';
    this.element.style.left = '0';
    this.element.style.position = 'absolute';
    this.element.style.textAlign = 'center';
    this.element.style.top = '0';
    document.body.appendChild(this.element);
  }

  update(step, height) {
    this.catchResize(height);
    this.rotate(step);
    this.translate(step, height);
  }

  draw(scale) {
    const drawSize = Pointer.RADIUS * 2 * scale;
    const drawX = (this.positionX - Pointer.RADIUS) * scale;
    const drawY = document.documentElement.clientHeight - ((this.positionY + Pointer.RADIUS) * scale);

    this.element.style.height = `${drawSize}px`;
    this.element.style.width =`${drawSize}px`;
    this.element.style.lineHeight = `${drawSize}px`;
    this.element.style.fontSize = `${drawSize * 0.8}px`;
    this.element.style.transform = `translateX(${drawX}px) translateY(${drawY}px) rotateZ(${this.rotation}deg)`;
  }

  // private

  catchResize(height) {
    if (this.positionY > height - Pointer.RADIUS) this.positionY = height - Pointer.RADIUS;
  }

  rotate(step) {
    const angle = step / (1000 / Pointer.SPEED);

    this.rotation += angle;
    if (this.rotation >= 360) this.rotation -= 360;
  }

  translate(step, height) {
    const distance = step / (1000 / Pointer.SPEED);

    const projectedPosX = this.calculatePosX(distance);
    const projectedPosY = this.calculatePosY(distance);
    const newHeading = this.bounceOfWalls(projectedPosX, projectedPosY, height);

    if (newHeading === this.heading) {
      this.positionX = projectedPosX;
      this.positionY = projectedPosY;
    } else {
      this.heading = newHeading;
      this.positionX = this.calculatePosX(distance);
      this.positionY = this.calculatePosY(distance);
    }
  }

  calculatePosX(distance) {
    return this.positionX + Math.cos(this.heading) * distance;
  }

  calculatePosY(distance) {
    return this.positionY + Math.sin(this.heading) * distance;
  }

  bounceOfWalls(posX, posY, height) {
    let newHeading = this.heading;

    if (posX < Pointer.RADIUS || posX > (1000 - Pointer.RADIUS))
      newHeading = MathHelper.rad540 - newHeading;

    if (posY < Pointer.RADIUS || posY > (height - Pointer.RADIUS))
      newHeading = MathHelper.rad360 - newHeading;

    return newHeading;
  }
}

export default Pointer;
