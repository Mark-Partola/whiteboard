import { Canvas } from "../renderer/Canvas";
import { IComponent, IDimensions } from "../types/domain";

export interface IAppLayerParams {
  components: IComponent[];
}

export class AppLayer implements IComponent<IAppLayerParams> {
  private canvas: Canvas;
  private components: IComponent[] = [];

  public constructor() {
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

  public update(params: IAppLayerParams) {
    this.components = params.components;

    this.components.forEach((component) => {
      if (component.update) {
        component.update({});
      }
    });
  }

  public render() {
    this.canvas.clear();
    this.components.forEach((component) => {
      component.render(this.canvas.ctx);
    });
  }
}
