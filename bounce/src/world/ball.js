import MathHelper from '../math-helper';
import TextSprite from '../view/text-sprite';

class Ball {
  static RADIUS = 100;
  static SPEED = 200;

  constructor() {
    this.rotation = 0;
    this.positionX = Ball.RADIUS;
    this.positionY = Ball.RADIUS;
    this.heading = Math.PI / 4; // 45°

    this.view = new TextSprite({
      backgroundColor: 'darkblue',
      borderRadius: '50%',
      textColor: 'white',
      fontFamily: 'Helvetica Neue',
      text: '&uarr;'
    });
  }

  update(step, height) {
    this.catchResize(height);
    this.rotate(step);
    this.translate(step, height);
  }

  draw(scale, viewportHeight) {
    this.view.draw(
      this.positionX,
      this.positionY,
      this.rotation,
      Ball.RADIUS,
      scale,
      viewportHeight
    );
  }

  // private

  catchResize(height) {
    if (this.positionY > height - Ball.RADIUS) this.positionY = height - Ball.RADIUS;
  }

  rotate(step) {
    const angle = step / (1000 / Ball.SPEED);

    this.rotation += angle;
    if (this.rotation >= 360) this.rotation -= 360;
  }

  translate(step, height) {
    const distance = step / (1000 / Ball.SPEED);

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

    if (posX < Ball.RADIUS || posX > (1000 - Ball.RADIUS))
      newHeading = MathHelper.rad540 - newHeading;

    if (posY < Ball.RADIUS || posY > (height - Ball.RADIUS))
      newHeading = MathHelper.rad360 - newHeading;

    return newHeading;
  }
}

export default Ball;
