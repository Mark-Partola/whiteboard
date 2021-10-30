import { IComponent } from "../../types/domain";
import { IPattern } from "../types";

export class ImagePattern implements IComponent, IPattern {
  public constructor() {}

  public render() {}

  public getImage() {
    return new Image();
  }

  public getDimensions() {
    return {
      width: 0,
      height: 0,
    };
  }
}
