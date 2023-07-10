import Answer from "../components/Answer";

export default class QuestionBoard extends Phaser.GameObjects.Container {
  constructor(scene, x, y, score, question, callback) {
    super(scene, x, y);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.score = score;
    this.question = question;
    this.callback = callback;

    this.scene.add.existing(this);

    this.isSelectedAnswerCorrect = "";
    this.isAnswerSelected = false;
    this.offTime = 3000;

    this.correctAnswerTexts = [
      "You're right ",
      "Great! ",
      "Correct! ",
      "Absolutely! ",
      "Great job! ",
      "You got it! ",
    ];
    this.notCorrectAnswerTexts = ["Wrong! ", "Sorry. "];

    this.background = this.addBackground(0, 0);

    this.scoreText = this.addScoreText(
      this.background.x + 190,
      this.background.y - 130
    );

    this.questionText = this.addQuestionText(
      this.background.x - 50,
      this.background.y - 120
    );

    this.correctOfTheAnswerText = this.addCorrectOfTheAnswerText(
      this.background.x + 200,
      this.background.y + 100
    );

    this.containerArray = [
      this.background,
      this.scoreText,
      this.questionText,
      this.correctOfTheAnswerText,
    ];

    this.addAnswers();

    this.add(this.containerArray);

    this.scene.game.audio.vo.play("question_" + this.question.key);
    if (this.questionText.text.length >= 60) this.questionText.setScale(0.8);
  }

  addBackground(x, y) {
    return this.scene.add.image(x, y, "questionBg").setOrigin(0.5, 0.5);
  }

  addScoreText(x, y) {
    return this.scene.add
      .text(x, y, this.score, {
        fontFamily: "ewert",
        fontSize: "40px",
        color: "#000000",
        stroke: "#000000",
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5);
  }

  addQuestionText(x, y) {
    return this.scene.add
      .text(x, y, this.question.question, {
        fontFamily: "bangers",
        fontSize: "25px",
        color: "#000000",
        stroke: "#000000",
        wordWrap: { width: 360 },
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5);
  }

  addCorrectOfTheAnswerText(x, y) {
    return this.scene.add
      .text(x, y, "", {
        fontFamily: "bangers",
        fontSize: "40px",
        color: "#FFFFFF",
        stroke: "#000000",
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5)
      .setAngle(-40);
  }

  addAnswers() {
    for (let i = 0; i <= this.question.answers.length - 1; i++) {
      let x = this.background.x - 100;
      let y = this.background.y + 25 + i * 70;
      let text = this.question.answers[i];

      this.addAnswer(x, y, text, i);
    }
    this.add(this.containerArray);
  }

  addAnswer(x, y, text, i) {
    const answer = new Answer(this.scene, x, y, text).setVisible(false);

    this.scene.time.delayedCall(this.question.cue[i], () => {
      answer.setVisible(true);
    });

    const answerText = answer.getText();
    const questionCorrectAnswer = this.question.correctAnswer;

    answer.on("pointerdown", () => {
      if (this.isAnswerSelected) return;
      let feedbackAudio = this.question.feedback[i];

      this.scene.game.audio.vo.stop();
      this.scene.game.audio.vo.play(feedbackAudio);

      this.scene.game.audio.vo.on(
        "complete",
        () => {
          this.scene.game.audio.vo.removeListener("complete");
          this.scene.game.audio.vo.stop();
          this.callback();
          this.destroy();
        },
        this
      );

      answer.setSelected();
      this.isAnswerSelected = true;

      this.isSelectedAnswerCorrect = answerText === questionCorrectAnswer;
      this.setupCorrectOfTheAnswerText();
    });

    this.containerArray.push(answer);
  }

  off() {
    this.scene.time.delayedCall(this.offTime, () => {
      this.callback();
      this.destroy();
    });
  }

  setupCorrectOfTheAnswerText() {
    const answerArray = this.isSelectedAnswerCorrect
      ? this.correctAnswerTexts
      : this.notCorrectAnswerTexts;

    const answerIndex = Phaser.Math.Between(0, answerArray.length - 1);
    const answer = answerArray[answerIndex];

    this.correctOfTheAnswerText.setText(answer);
  }
}
