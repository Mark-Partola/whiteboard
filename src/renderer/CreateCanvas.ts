export class Canvas {
  public ctx: CanvasRenderingContext2D;

  constructor(params: { root: HTMLElement }) {
    const $canvas = document.createElement("canvas");

    const width = window.innerWidth;
    const height = window.innerHeight;

    const dpr = window.devicePixelRatio;

    $canvas.width = width * dpr;
    $canvas.height = height * dpr;
    $canvas.style.width = `${width}px`;
    $canvas.style.height = `${height}px`;

    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

    this.ctx.scale(dpr, dpr);

    params.root.appendChild($canvas);
  }
}
