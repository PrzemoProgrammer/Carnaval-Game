import Button from "../components/Button";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.addBackground(0, 0);
    this.addPlayButton(this.gw / 2 + 40, this.gh / 2 + 55);
    this.game.audio.sfx.play("Comic_Carousel_13_intro");
  }

  update() {}

  addBackground(x, y) {
    this.background = this.add.image(x, y, "menuBg").setOrigin(0, 0);
  }

  addPlayButton(x, y) {
    const button = new Button(this, x, y, "playButton");

    const cb1 = () => {
      button.setTexture("playButtonClicked");
    };
    const cb2 = () => {
      this.game.audio.sfx.stop();
      this.scene.start("PlayScene");
    };
    button.onClick(cb1, cb2);
  }
}
