import MathHelper from './math-helper.js';

const Pointer = (key) => {
  const RADIUS = 100;
  const SPEED = 200;

  const element = document.createElement('div');

  let rotation = 0;
  let positionX = RADIUS;
  let positionY = RADIUS;
  let heading = Math.PI / 4; // 45°

  // initialize ----------------------------------------------------------------

  element.innerHTML = '&uarr;';
  element.style.backgroundColor = 'darkblue';
  element.style.borderRadius = '50%';
  element.style.color = 'white';
  element.style.fontFamily = 'Helvetica Neue';
  element.style.left = '0';
  element.style.position = 'absolute';
  element.style.textAlign = 'center';
  element.style.top = '0';
  document.body.appendChild(element);

  // public --------------------------------------------------------------------

  const update = (step, height) => {
    catchResize(height);
    rotate(step);
    translate(step, height);
  };

  const draw = (scale) => {
    const drawSize = RADIUS * 2 * scale;
    const drawX = (positionX - RADIUS) * scale;
    const drawY = document.documentElement.clientHeight - ((positionY + RADIUS) * scale);

    element.style.height = `${drawSize}px`;
    element.style.width =`${drawSize}px`;
    element.style.lineHeight = `${drawSize}px`;
    element.style.fontSize = `${drawSize * 0.8}px`;
    element.style.transform = `translateX(${drawX}px) translateY(${drawY}px) rotateZ(${rotation}deg)`;
  };

  const die = () => {
    element.parentNode.removeChild(element);
  };

  // private -------------------------------------------------------------------

  const _key = () => {
    return key;
  };

  const catchResize = (height) => {
    if (positionY > height - RADIUS) positionY = height - RADIUS;
  }

  const rotate = (step) => {
    const angle = step / (1000 / SPEED);

    rotation += angle;
    if (rotation >= 360) rotation -= 360;
  };

  const translate = (step, height) => {
    const distance = step / (1000 / SPEED);

    const projectedPosX = calculatePosX(distance);
    const projectedPosY = calculatePosY(distance);
    const newHeading = bounceOfWalls(projectedPosX, projectedPosY, height);

    if (newHeading === heading) {
      positionX = projectedPosX;
      positionY = projectedPosY;
    } else {
      heading = newHeading;
      positionX = calculatePosX(distance);
      positionY = calculatePosY(distance);
    }
  };

  const calculatePosX = (distance) => {
    return positionX + Math.cos(heading) * distance;
  };

  const calculatePosY = (distance) => {
    return positionY + Math.sin(heading) * distance;
  };

  const bounceOfWalls = (posX, posY, height) => {
    let newHeading = heading;

    if (posX < RADIUS || posX > (1000 - RADIUS))
      newHeading = MathHelper.rad540 - newHeading;

    if (posY < RADIUS || posY > (height - RADIUS))
      newHeading = MathHelper.rad360 - newHeading;

    return newHeading;
  };

  return { update, draw, die };
}

export default Pointer;
