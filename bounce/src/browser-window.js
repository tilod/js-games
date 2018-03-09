class BrowserWindow {
  constructor() {
    this.html = document.documentElement;
  }

  scale() {
    return this.html.scrollWidth / 1000;
  }

  normalizedHeight() {
    return 1000 * (this.html.clientHeight / this.html.clientWidth);
  }
}

export default BrowserWindow;
