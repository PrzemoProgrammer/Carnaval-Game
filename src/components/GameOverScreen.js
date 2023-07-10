import Button from "../components/Button";

export default class GameOverScreen extends Phaser.GameObjects.Container {
  constructor(scene, x, y, cb) {
    super(scene, x, y);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.cb = cb;

    this.scene.add.existing(this);

    this.callback = "";

    this.text = "Game Over";

    this.background = this.addBackground(0, 0);

    this.restartButton = this.addRestartButton(
      this.background.x,
      this.background.y + 50
    );

    this.gameOverText = this.gameOverText(
      this.background.x,
      this.background.y - 120
    );

    this.add([this.background, this.restartButton, this.gameOverText]);
  }

  addBackground(x, y) {
    return this.scene.add.image(x, y, "gameOverBg").setOrigin(0.5, 0.5);
  }

  gameOverText(x, y) {
    return this.scene.add
      .text(x, y, this.text, {
        fontFamily: "bangers",
        fontSize: "50px",
        color: "#000000",
        stroke: "#000000",
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5);
  }

  addRestartButton(x, y) {
    const button = new Button(this.scene, x, y, "playButton").setScale(0.6);

    const cb1 = () => {
      button.setTexture("playButtonClicked");
    };
    const cb2 = () => {
      this.cb();
      // this.callback();
    };

    button.onClick(cb1, cb2);

    return button;
  }

  // whenClickRestartButton(cb) {
  //   this.callback = cb;
  // }
}
