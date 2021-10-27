export class Loop {
  private time = 0;
  private desiredFramesPerSecond: number;
  private timePerFrame: number;

  public constructor(
    private readonly params: {
      frames?: number;
      update?: Function;
      render?: Function;
      init?: Function;
    }
  ) {
    this.desiredFramesPerSecond = this.params.frames || 60;
    this.timePerFrame = 1000 / this.desiredFramesPerSecond;

    if (this.params.init) {
      this.params.init();
    }
  }

  public run() {
    this.tick();
    this.loop();
  }

  private loop() {
    requestAnimationFrame((elapsedTime) => {
      const isNeedTick = elapsedTime - this.time < this.timePerFrame;

      if (isNeedTick) {
        return this.loop();
      }

      this.time = elapsedTime;

      this.tick();
      this.loop();
    });
  }

  private tick() {
    if (this.params.update) {
      this.params.update();
    }

    if (this.params.render) {
      this.params.render();
    }
  }
}
