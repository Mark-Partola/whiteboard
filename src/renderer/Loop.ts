export class Loop {
  public constructor(
    private readonly hooks: { update?: Function; render?: Function }
  ) {}

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
