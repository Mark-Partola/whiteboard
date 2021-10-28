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
  private pattern: HTMLCanvasElement;

  public constructor(params: { camera: Camera; pattern: HTMLCanvasElement }) {
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

    this.tiles.forEach((position) => {
      this.canvas.ctx.drawImage(
        this.pattern,
        position.x - this.camera.position.x,
        position.y - this.camera.position.y,
        this.camera.dimensions.width,
        this.camera.dimensions.height
      );
    });
  }
}
