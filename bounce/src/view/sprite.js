class Sprite {
  constructor({ backgroundColor, borderRadius }) {
    this.element = document.createElement('div');

    this.element.style.backgroundColor = backgroundColor;
    this.element.style.borderRadius = borderRadius;

    this.element.style.position = 'absolute';
    this.element.style.top = '0';
    this.element.style.left = '0';

    document.body.appendChild(this.element);
  }

  draw(position, rotation, radius, scale, viewportHeight) {
    const drawSize = radius * 2 * scale;
    const drawX = (position.x - radius) * scale;
    const drawY = viewportHeight - ((position.y + radius) * scale);

    this.updateElement(drawSize, drawX, drawY);
  }

  updateElement(drawSize, drawX, drawY) {
    this.element.style.height = `${drawSize}px`;
    this.element.style.width =`${drawSize}px`;
    this.element.style.transform = `translate(${drawX}px, ${drawY}px) rotate(0deg)`;
  }
}

export default Sprite;
