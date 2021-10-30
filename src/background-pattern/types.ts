import { IDimensions } from "../types/domain";

export interface IPattern {
  getDimensions: () => IDimensions;
  getImage: () => HTMLImageElement | HTMLCanvasElement;
}
