export default class Hand extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    scene.add.existing(this);
  }

  playThrowAnim(cb) {
    this.anims.play("hand-throw", true).once("animationcomplete", () => {
      cb();
    });
  }

  reset() {
    this.setTexture("hand-spritesheet");
  }
}
