import { IOffset } from "../types/domain";

export interface IScrollParams {
  onChange: (params: IOffset) => void;
}

// TODO: add IDisposable interface
export class Scroll {
  public constructor(params: IScrollParams) {
    document.addEventListener("wheel", (event: WheelEvent) => {
      params.onChange({
        dx: event.deltaX,
        dy: event.deltaY,
      });
    });
  }
}
