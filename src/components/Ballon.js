import ScoreSheet from "../components/ScoreSheet";

export default class Ballon extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, index, score) {
    super(scene, x, y, index);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.textureIndex = index;
    this.score = score;

    scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.body.allowGravity = false;
    this.body.immovable = false;

    this.isPooped = false;
    this.id = null;

    this.setInteractive();
    this.setTexture("ballon_" + this.textureIndex);

    this.scoreSheet = this.addScoreSheet(this.x, this.y).setVisible(false);

    this.setupBody();
  }

  onClick(cb) {
    this.on("pointerdown", () => {
      this.setScale(0.9);
    }).on("pointerup", () => {
      cb(), this.setScale(1);
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

  setupBody() {
    this.body.setCircle(34);
    this.body.offset.x = 16;
    this.body.offset.y = 7;
  }

  pop(x, y) {
    this.setTexture("pop_ballon_" + this.textureIndex);
    this.scene.physics.world.disableBody(this.body);
    this.isPooped = true;
    this.scene.time.delayedCall(100, () => {
      this.setVisible(false);
      this.setupScoreSheet(x, y - 10);
    });
  }

  addScoreSheet(x, y) {
    return new ScoreSheet(this.scene, x, y, "score-sheet", this.score);
  }

  setupScoreSheet(x, y) {
    this.scoreSheet.setPosition(x, y);
    this.scoreSheet.scoreText.setPosition(x + 8, y + 19);
    this.scoreSheet.setVisible(true);
    this.scoreSheet.scoreText.setVisible(true);
  }

  getScore() {
    return this.scoreSheet.score;
  }

  getAudioIndex() {
    let index = null;
    const score = this.getScore();
    if (score === 10) {
      index = "hit_10";
    } else if (score === 20) {
      index = "hit_20";
    } else if (score === 30) {
      index = "hit_30";
    }
    return index;
  }
}
