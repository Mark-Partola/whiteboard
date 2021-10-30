import { Canvas } from "../renderer/Canvas";
import { IComponent, IDimensions } from "../types/domain";

export class AppLayer implements IComponent {
  private canvas: Canvas;
  private components: IComponent[];

  public constructor(params: { components: IComponent[] }) {
    this.components = params.components;

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

  public update() {
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
