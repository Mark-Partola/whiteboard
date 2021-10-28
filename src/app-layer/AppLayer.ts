import { Camera } from "../camera/Camera";
import { BackgroundPatternLayer } from "../background-pattern-layer";
import { Canvas } from "../renderer/Canvas";
import { IComponent, IDimensions, IPoint } from "../types/domain";

export interface IAppLayerUpdateParams {
  tiles: IPoint[];
}

export class AppLayer implements IComponent<IAppLayerUpdateParams> {
  private canvas: Canvas;
  private camera: Camera;
  private tiles: IPoint[] = [];
  private backgroundPatternLayer: BackgroundPatternLayer;

  public constructor(params: { camera: Camera }) {
    this.camera = params.camera;
    this.canvas = new Canvas({
      root: document.body,
      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });

    this.backgroundPatternLayer = new BackgroundPatternLayer({
      dimensions: this.camera.dimensions,
    });
  }

  public resize(dimensions: Readonly<IDimensions>) {
    this.canvas.resize(dimensions);
  }

  public init() {
    this.backgroundPatternLayer.render();

    window.addEventListener("resize", () => {
      const dimensions = (this.camera.dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      });

      this.resize(dimensions);

      this.backgroundPatternLayer.update({ dimensions });
      this.backgroundPatternLayer.render();
    });
  }

  public update(params: IAppLayerUpdateParams) {
    this.tiles = params.tiles;
  }

  public render() {
    this.canvas.clear();

    this.tiles.forEach((position) => {
      this.canvas.ctx.drawImage(
        this.backgroundPatternLayer.getCanvas(),
        position.x - this.camera.position.x,
        position.y - this.camera.position.y,
        this.camera.dimensions.width,
        this.camera.dimensions.height
      );
    });
  }
}
