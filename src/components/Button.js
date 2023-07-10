export default class Button extends Phaser.GameObjects.Image {
  constructor(scene, x, y, image) {
    super(scene, x, y, image);
    scene.add.existing(this);
    this.scene = scene;

    this.setInteractive();
  }

  onClick(cb1, cb2) {
    this.on("pointerdown", () => {
      cb1();
    }).on("pointerup", () => {
      cb2();
    });

    return this;
  }

  pointerOver(callback) {
    this.on("pointerover", () => callback());
    return this;
  }

  pointerOut(callback) {
    this.on("pointerout", () => callback());
    return this;
  }

  addText(text, config = {}) {
    this.text = this.scene.add
      .text(this.x, this.y, text, config)
      .setOrigin(0.5);
    return this;
  }

  destroy() {
    this.text && this.text.destroy();
    super.destroy();
  }
}
