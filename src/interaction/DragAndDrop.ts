import { boundClass } from "autobind-decorator";
import { IOffset } from "../types/domain";

@boundClass
export class DragAndDrop {
  private startX: number = 0;
  private startY: number = 0;

  public constructor(
    private readonly params: {
      onMove: (delta: Readonly<IOffset>) => void;
    }
  ) {
    document.addEventListener("mousedown", this.handleMouseDown);
  }

  private handleMouseDown(event: MouseEvent) {
    this.startX = event.pageX;
    this.startY = event.pageY;

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  private handleMouseMove(event: MouseEvent) {
    const { pageX, pageY } = event;
    const dx = pageX - this.startX;
    const dy = pageY - this.startY;

    this.startX = pageX;
    this.startY = pageY;

    this.params.onMove({ dx, dy });
  }

  private handleMouseUp() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
}
