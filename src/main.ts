import { Camera } from "./camera/Camera";
import { Loop } from "./renderer/Loop";
import { AppLayer } from "./app-layer";
import { BackgroundPattern } from "./background-pattern";
import { ImagePattern } from "./background-pattern/image-pattern";

import "./style.css";
import { ResourceLoader } from "./resource-loader";
import { IComponent } from "./types/domain";

const config = {
  container: {
    dimensions: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
};

const camera = new Camera({
  dimensions: config.container.dimensions,
  position: {
    x: 0,
    y: 0,
  },
});

(window as any).camera = camera;

const components: IComponent[] = [];
const app = new AppLayer();

const loop = new Loop({
  init: () => {
    window.addEventListener("resize", () => {
      const dimensions = (config.container.dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      });

      camera.setDimensions(dimensions);

      app.resize(dimensions);
    });

    const imagePromise = ResourceLoader.loadImage(
      "https://365psd.com/images/previews/da4/vector-seamless-abstract-pattern-background-3544.jpg"
    );

    imagePromise.then((image) => {
      const backgroundPattern = new BackgroundPattern({
        camera,
        pattern: new ImagePattern({
          image,
        }),
      });

      components.push(backgroundPattern);
    });
  },
  update: () => {
    app.update({ components });
  },
  render: () => {
    app.render();
  },
});

loop.run();
