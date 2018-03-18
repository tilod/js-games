class RoundTextSprite {
  constructor({ backgroundColor, textColor, fontFamily, text }) {
    this.element = document.createElement('div');

    this.element.style.borderRadius = '50%';
    this.element.style.textAlign = 'center';
    this.element.style.backgroundColor = backgroundColor;
    this.element.style.color = textColor,
    this.element.style.fontFamily = fontFamily;
    this.element.innerHTML = text;

    this.element.style.position = 'absolute';
    this.element.style.top = '0';
    this.element.style.left = '0';

    document.body.appendChild(this.element);
  }

  draw(positionX, positionY, rotation, radius, scale, viewportHeight) {
    const drawSize = radius * 2 * scale;
    const drawX = (positionX - radius) * scale;
    const drawY = viewportHeight - ((positionY + radius) * scale);

    this.element.style.height = `${drawSize}px`;
    this.element.style.width =`${drawSize}px`;
    this.element.style.lineHeight = `${drawSize}px`;
    this.element.style.fontSize = `${drawSize * 0.8}px`;
    this.element.style.transform = `translateX(${drawX}px) translateY(${drawY}px) rotateZ(${rotation}deg)`;
  }
}

export default RoundTextSprite;
