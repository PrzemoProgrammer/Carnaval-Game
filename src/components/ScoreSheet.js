export default class ScoreSheet extends Phaser.GameObjects.Image {
  constructor(scene, x, y, sprite, score) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.score = score;

    scene.add.existing(this);
    this.setVisible(false);
    this.setOrigin(0.5, 0);

    // this.scores = [10, 20, 30];

    // this.score = this.addRandomScore();
    this.scoreText = this.addScoreText(this.x + 60, this.y + 20);
  }

  addScoreText(x, y) {
    return this.scene.add
      .text(x, y, this.score, {
        fontFamily: "ewert",
        fontSize: "20px",
        color: "#000000",
        stroke: "#000000",
        // strokeThickness: 5,

        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5, 0)
      .setVisible(false)
      .setAngle(50);
  }

  getScore() {
    return this.score;
  }

  // addRandomScore() {
  //   let randomScore = this.getRandomNumber(0, 2);
  //   let score = this.scores[randomScore];
  //   return score;
  // }

  // getRandomNumber(num1, num2) {
  //   return Math.floor(Phaser.Math.Between(num1, num2));
  // }
}
