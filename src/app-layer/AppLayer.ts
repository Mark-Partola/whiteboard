import { Camera } from "../camera/Camera";
import { Canvas } from "../renderer/Canvas";
import { IComponent, IDimensions, IPoint } from "../types/domain";

export interface IAppLayerUpdateParams {
  tiles: IPoint[];
}

export class AppLayer implements IComponent<IAppLayerUpdateParams> {
  private canvas: Canvas;
  private camera: Camera;
  private tiles: IPoint[] = [];
  private pattern: HTMLCanvasElement | HTMLImageElement;

  public constructor(params: {
    camera: Camera;
    pattern: HTMLCanvasElement | HTMLImageElement;
  }) {
    this.camera = params.camera;
    this.pattern = params.pattern;

    this.canvas = new Canvas({
      root: document.body,
      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }

  public resize(dimensions: Readonly<IDimensions>) {
    this.canvas.resize(dimensions);
  }

  public update(params: IAppLayerUpdateParams) {
    this.tiles = params.tiles;
  }

  public render() {
    this.canvas.clear();

    const dimensions = (() => {
      if (this.pattern instanceof HTMLCanvasElement) {
        return {
          width: parseInt(this.pattern.style.width),
          height: parseInt(this.pattern.style.height),
        };
      } else {
        return {
          width: this.pattern.width,
          height: this.pattern.height,
        };
      }
    })();

    this.tiles.forEach((position) => {
      this.canvas.ctx.drawImage(
        this.pattern,
        position.x - this.camera.position.x,
        position.y - this.camera.position.y,
        dimensions.width,
        dimensions.height
      );
    });
  }
}
