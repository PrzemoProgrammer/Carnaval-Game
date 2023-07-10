export default class Dart extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    scene.add.existing(this);
    this.setVisible(false);

    this.setOrigin(0, 0);
  }

  moveTo(x, y, cb) {
    this.scene.tweens.add({
      targets: this,
      scale: 0.5,
      angle: -90,
      x: x,
      y: y,
      duration: 500,
      onComplete: () => {
        this.setTexture("dart-down");
        this.setupBody();

        cb();
      },
    });
  }

  throw(x, y, cb) {
    this.setVisible(true);
    this.moveTo(x, y, cb);
  }

  setupBody() {
    this.scene.physics.world.enableBody(this);
    this.body.allowGravity = false;
    this.body.immovable = false;

    this.setupBodySize();
  }

  setupBodySize() {
    this.body.setCircle(1);
    this.body.offset.x = 0;
    this.body.offset.y = 0;

    // this.body.width = 1;
    // this.body.height = 1;
  }
}
