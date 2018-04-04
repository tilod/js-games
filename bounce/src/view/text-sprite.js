import Sprite from './sprite'

class TextSprite extends Sprite {
  constructor({ backgroundColor, borderRadius, textColor, fontFamily, text }) {
    super({ backgroundColor, borderRadius });

    this.element.style.textAlign = 'center';
    this.element.style.color = textColor,
    this.element.style.fontFamily = fontFamily;
    this.element.innerHTML = text;
  }

  updateElement(drawSize, drawX, drawY, rotation) {
    super.updateElement(drawSize, drawX, drawY, rotation);

    this.element.style.lineHeight = `${drawSize}px`;
    this.element.style.fontSize = `${drawSize * 0.8}px`;
  }
}

export default TextSprite;
