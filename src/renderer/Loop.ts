export class Loop {
  public constructor(
    private readonly hooks: {
      update?: Function;
      render?: Function;
      init?: Function;
    }
  ) {
    if (this.hooks.init) {
      this.hooks.init();
    }
  }

  public run() {
    requestAnimationFrame(() => {
      if (this.hooks.update) {
        this.hooks.update();
      }

      if (this.hooks.render) {
        this.hooks.render();
      }

      this.run();
    });
  }
}
