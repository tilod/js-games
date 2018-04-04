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

  draw(positionX, positionY, rotation, radius, scale, viewportHeight) {
    const drawSize = radius * 2 * scale;
    const drawX = (positionX - radius) * scale;
    const drawY = viewportHeight - ((positionY + radius) * scale);

    this.updateElement(drawSize, drawX, drawY, rotation);
  }

  updateElement(drawSize, drawX, drawY, rotation) {
    this.element.style.height = `${drawSize}px`;
    this.element.style.width =`${drawSize}px`;
    this.element.style.transform = `translate(${drawX}px, ${drawY}px) rotate(${rotation}deg)`;
  }
}

export default Sprite;
