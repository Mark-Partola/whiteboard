import { IPattern } from "../types";

export class ImagePattern implements IPattern {
  private image: HTMLImageElement;

  public constructor(params: { image: HTMLImageElement }) {
    this.image = params.image;
  }

  public getImage() {
    return this.image;
  }

  public getDimensions() {
    return {
      width: this.image.width,
      height: this.image.height,
    };
  }
}
