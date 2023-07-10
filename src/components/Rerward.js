export default class Reward extends Phaser.GameObjects.Container {
  constructor(scene, x, y, texture) {
    super(scene, x, y);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.texture = texture;

    this.scene.add.existing(this);

    this.background = this.addBackground(0, 0);

    this.reward = this.addReward(this.background.x, this.background.y);

    this.add([this.background, this.reward]);
    this.setSize(this.background.width, this.background.height);
    this.setInteractive();
  }

  addBackground(x, y) {
    return this.scene.add.image(x, y, "rewardBg").setOrigin(0.5, 0.5);
  }

  addReward(x, y) {
    return this.scene.add.image(x, y, this.texture).setOrigin(0.5, 0.5);
  }

  onClick(cb) {
    this.on("pointerdown", () => {
      cb();
    }).on("pointerup", () => {});

    return this;
  }

  setSelected() {
    this.background.setTexture("selectedRewardBg");
  }
}
