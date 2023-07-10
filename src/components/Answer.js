export default class Answer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text) {
    super(scene, x, y);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.text = text;
    scene.add.existing(this);

    this.background = this.addBackground(0, 0);

    this.text = this.addAnswerText(this.background.x, this.background.y - 5);

    this.add([this.background, this.text]);
    this.setSize(this.background.width, this.background.height);
    this.setInteractive();

    if (this.text.text.length >= 2 && this.text.text.length <= 10)
      this.text.setScale(1.3);
  }

  addBackground(x, y) {
    return this.scene.add.image(x, y, "answerBg").setOrigin(0.5, 0.5);
  }

  addAnswerText(x, y) {
    return this.scene.add
      .text(x, y, this.text, {
        fontFamily: "bangers",
        fontSize: "20px",
        color: "#FF0000",
        stroke: "#000000",
        wordWrap: { width: 310 },
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5, 0.5);
  }

  getText() {
    return this.text.text;
  }

  setSelected() {
    this.background.setTexture("selectedAnswerBg");
  }
}
