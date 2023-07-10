export default class Loading {
  constructor(scene) {
    this.scene = scene;

    this.addBackground();
    this.addChargeNumber();
    // this.addProgressBar();
    // this.addProgressContainer();

    // const progressBarWidth = this.progressBar.displayWidth;

    this.scene.load.on("progress", (value) => {
      let chargesNumber = Math.round(value * 100);
      this.chargesNumber.setText(chargesNumber + "%");
      //   this.progressBar.displayWidth = progressBarWidth * value;
    });
  }

  addBackground() {
    this.background = this.scene.add
      .rectangle(
        0,
        0,
        this.scene.game.config.width,
        this.scene.game.config.height,
        0xffff00
      )
      .setOrigin(0, 0);

    // this.background = this.scene.add.image(
    //   this.scene.game.config.width / 2,
    //   this.scene.game.config.height / 2,
    //   "guiBackground"
    // );
  }

  addChargeNumber() {
    // this.chargesNumber = this.scene.add
    //   .text(
    //     this.scene.game.config.width / 2,
    //     this.scene.game.config.height / 2,
    //     "menuBg"
    //   )
    //   .setOrigin(0.5, 0.5);

    this.chargesNumber = this.scene.add
      .text(
        this.scene.game.config.width / 2,
        this.scene.game.config.height / 2,
        0,
        {
          fontFamily: "Arial",
          fontSize: "40px",
          color: "#000000",
          stroke: "#000000",
          strokeThickness: 1,
          shadow: { blur: 0, stroke: false, fill: false },
        }
      )
      .setOrigin(0.5, 0.5);
  }

  //   addProgressBar() {
  //     this.progressBar = this.scene.add.image(
  //       this.scene.game.config.width / 2,
  //       this.scene.game.config.height / 2,
  //       "loadingBar"
  //     );
  //   }

  //   addProgressContainer() {
  //     this.progressContainer = this.scene.add.image(
  //       this.progressBar.x,
  //       this.progressBar.y - 20,
  //       "loadingContainer"
  //     );
  //   }

  onComplete(callback) {
    this.scene.load.on("complete", () => {
      callback();
    });
  }

  destroy() {
    // this.progressContainer.destroy();
    // this.progressBar.destroy();
    this.background.destroy();
    this.chargesNumber.destroy();
  }
}
