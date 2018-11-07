export default class BrowserWindow {
  private _htmlDocument : HTMLElement;
  private _viewportWidth : number;
  private _viewportHeight : number;
  private _viewportRatio : number;

  constructor() {
    this._htmlDocument = document.documentElement;
    this.update();
  }

  get viewportWidth() : number { return this._viewportWidth };
  get viewportHeight() : number { return this._viewportHeight };
  get viewportRatio() : number { return this._viewportRatio };

  public update() : void {
    this._viewportWidth = this._htmlDocument.clientWidth;
    this._viewportHeight = this._htmlDocument.clientHeight;
    this._viewportRatio = this._viewportHeight / this.viewportWidth;
  }
}
