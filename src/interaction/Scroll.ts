import { IOffset, IPoint } from "../types/domain";

export interface IScrollParams {
  onChange: (params: { delta: IOffset; position: IPoint }) => void;
}

// TODO: add IDisposable interface
export class Scroll {
  public constructor(params: IScrollParams) {
    document.addEventListener("wheel", (event: WheelEvent) => {
      console.log(event);
      params.onChange({
        delta: {
          dx: event.deltaX,
          dy: event.deltaY,
        },
        position: {
          x: event.pageX,
          y: event.pageY,
        },
      });
    });
  }
}
