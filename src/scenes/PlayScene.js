import Button from "../components/Button";
import Hand from "../components/Hand";
import Ballon from "../components/Ballon";
import Dart from "../components/Dart";
import QuestionBoard from "../components/QuestionBoard";
import GameOverScreen from "../components/GameOverScreen";
import ChooseRewardScreen from "../components/ChooseRewardScreen";
import questions from "../questions";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  init() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.balloons = [];
    this.collectedRewards = [];
    this.mouseX = null;
    this.mouseY = null;
    this.dart = "";

    const questionsCopy = { ...questions };
    this.questions = questionsCopy;
    this.isThrowing = false;
    this.isQuestionBoardOpen = false;
    this.timeToOpenQuestionBoard = 1000;
    this.score = 0;
    this.questionsArray = "";
    this.questionBoard = "";
    this.selectedBallon = "";
    this.selectedReward = "";
    this.scoreSheetScores = [10, 10, 10, 10, 10, 10, 20, 20, 30, 30];
  }

  create() {
    this.addBackground(0, 0);
    this.boardHitBox = this.addBoardHitBox();
    this.addBalloons();

    this.hand = this.addHand(this.gw - 100, this.gh - 80);
    this.scoreText = this.addScoreText(57, 430);

    this.addMousePointer();
    this.refreshBoard();

    this.game.audio.vo.play("intro");
  }

  update() {
    if (!this.isThrowing) this.setMouseCoordinates();
  }

  resetQuestions() {
    this.questions = questions;
  }

  addBackground(x, y) {
    this.background = this.add.image(x, y, "gameBg").setOrigin(0, 0);
  }

  setMouseCoordinates() {
    this.mouseX = this.input.activePointer.x;
    this.mouseY = this.input.activePointer.y;
  }

  refreshBoard() {
    const keys = Object.keys(this.questions);

    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const question = this.questions[randomKey];

    this.questionBoard = new QuestionBoard(this, 10, 10, 10, question, 14);

    this.game.audio.sfx.stop();
    this.game.audio.vo.stop();
    this.game.audio.sfx.removeListener("complete");
    this.game.audio.vo.removeListener("complete");

    this.questionBoard.destroy();
  }

  addMousePointer() {
    this.input.on("pointerdown", () => {
      if (
        this.isPointerInHitBoxArea() &&
        !this.isThrowing &&
        !this.isQuestionBoardOpen
      ) {
        this.isThrowing = true;

        let dartCb = () => {
          this.game.audio.sfx.play("dart_short");

          this.game.audio.sfx.on(
            "complete",
            () => {
              this.game.audio.vo.play("dart_miss");
            },
            this
          );

          this.isThrowing = false;
          this.hand.reset();
        };

        let cb = () => {
          this.throwDart(dartCb);
        };

        this.hand.playThrowAnim(cb);
      }
    });
  }

  addBalloonsCollisionWith(target) {
    this.balloons.forEach((balloon) => {
      this.physics.add.overlap(target, balloon, () => {
        if (balloon.isPooped) return;
        this.game.audio.sfx.removeListener("complete");
        this.game.audio.vo.removeListener("complete");
        this.game.audio.sfx.stop();

        this.game.audio.vo.stop();
        this.throwDortAudio(balloon);

        this.isQuestionBoardOpen = true;
        this.selectedBallon = balloon;
        balloon.pop(this.mouseX, this.mouseY);
        // this.balloons.splice(balloon, 1);
      });
    });
  }

  throwDortAudio(balloon) {
    let ballonAudioIndex = balloon.getAudioIndex();
    this.game.audio.sfx.removeListener("complete");
    this.game.audio.sfx.play("pop6a");
    this.game.audio.sfx.on(
      "complete",
      () => {
        this.game.audio.vo.play(ballonAudioIndex);
        this.game.audio.vo.on(
          "complete",
          () => {
            this.game.audio.vo.removeListener("complete");
            this.game.audio.vo.stop();
            this.getRandomQuestion();
          },
          this
        );
      },
      this
    );
  }

  updateScore(ballon) {
    let ballonScore = ballon.getScore();
    let score = (this.score += ballonScore);

    this.scoreText.setText(score);
  }

  throwDart(cb) {
    const dart = this.addDart(this.hand.x - 60, this.hand.y - 90);
    this.dart = dart;
    dart.throw(this.mouseX, this.mouseY, cb);
    this.addBalloonsCollisionWith(dart);
  }

  addBalloon(x, y, score) {
    let texture = Math.floor(Phaser.Math.Between(1, 4));

    const ballon = new Ballon(this, x, y, texture, score);
    this.balloons.push(ballon);
    ballon.id = this.balloons.length;
  }

  addBalloons() {
    const rows = [3, 4, 3];
    const spacingX = 95;
    const spacingY = 80;
    const startX = (90 + rows[0] * spacingX) / 2;
    const startY = (100 + (rows[1] - 1) * spacingY) / 2;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      const offsetY = rowIndex * spacingY;

      for (let i = 0; i < row; i++) {
        const score = this.getRandomScore();
        const offsetX = rowIndex === 1 ? -spacingX / 2 : 0;
        const x = startX + i * spacingX + offsetX;
        const y = startY + offsetY;

        this.addBalloon(x, y, score);
      }
    }
  }

  getRandomScore() {
    let randomScore = Math.floor(
      Phaser.Math.Between(0, this.scoreSheetScores.length - 1)
    );
    let score = this.scoreSheetScores[randomScore];
    this.scoreSheetScores.splice(randomScore, 1);
    return score;
  }

  addHand(x, y) {
    return new Hand(this, x, y, "hand-spritesheet");
  }

  addBoardHitBox() {
    return this.add
      .rectangle(80, 110, 380, 270, 0xff0000)
      .setOrigin(0, 0)
      .setAlpha(0);
  }

  isPointerInHitBoxArea() {
    return (
      this.mouseX >= this.boardHitBox.x &&
      this.mouseX <= this.boardHitBox.x + this.boardHitBox.width &&
      this.mouseY >= this.boardHitBox.y &&
      this.mouseY <= this.boardHitBox.y + this.boardHitBox.height
    );
  }

  addDart(x, y) {
    return new Dart(this, x, y, "dart-up");
  }

  addScoreText(x, y) {
    return this.add
      .text(x, y, this.score, {
        fontFamily: "ewert",
        fontSize: "40px",
        color: "#000000",
        stroke: "#000000",
        // strokeThickness: 5,
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5, 0.5);
  }

  addQuestionBoard(x, y, score, question, callback) {
    this.questionBoard = new QuestionBoard(
      this,
      x,
      y,
      score,
      question,
      callback
    );
  }

  gameOver() {
    this.isThrowing = true;
    this.addGameOverScreen();
  }

  offAllAudio() {
    this.game.audio.sfx.removeListener("complete");
    this.game.audio.sfx.stop();
    this.game.audio.vo.stop();
    this.game.audio.vo.removeListener("complete");
  }

  getRandomQuestion() {
    const keys = Object.keys(this.questions);

    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const question = this.questions[randomKey];

    const callback = () => {
      this.isQuestionBoardOpen = false;

      if (Object.keys(this.questions).length === 10) {
        this.gameOver();
        return;
      }

      this.offAllAudio();
      this.game.audio.vo.play("next_turn");

      if (this.questionBoard.isSelectedAnswerCorrect) {
        this.updateScore(this.selectedBallon);
        this.addChooseRewardScreen();
      }
    };

    this.addQuestionBoard(
      this.gw / 2,
      this.gh / 2,
      this.selectedBallon.getScore(),
      question,
      callback
    );

    delete this.questions[randomKey];
  }

  addGameOverScreen() {
    const audioFiles = [
      "zero_prizes_won",
      "one_prize_won",
      "two_prizes_won",
      "all_prizes_won",
    ];
    const countOfRewardsAudio =
      audioFiles[Math.min(this.collectedRewards.length, audioFiles.length - 1)];

    this.offAllAudio();
    this.game.audio.vo.play(countOfRewardsAudio);

    const cb = () => {
      this.offAllAudio();
      this.scene.restart();
    };

    this.gameOverScreen = new GameOverScreen(
      this,
      this.gw / 2,
      this.gh / 2,
      cb
    );
  }

  addChooseRewardScreen() {
    let index = null;
    let rewardAudio = "";

    if (this.collectedRewards.length === 3) {
      return;
    }

    if (this.score >= 90 && this.collectedRewards.length != 3) {
      index = 2;
    } else if (
      this.score >= 60 &&
      (this.collectedRewards.length === 1 || this.collectedRewards.length === 0)
    ) {
      index = 1;
    } else if (this.score >= 30 && this.collectedRewards.length === 0) {
      index = 0;
    } else {
      return;
    }

    this.isQuestionBoardOpen = true;

    const cb = () => {
      this.selectedReward = this.chooseRewardScreen.getReward();
      this.offAllAudio();
      this.game.audio.sfx.play("happyalert");
      this.addRewardToCollection();

      this.isQuestionBoardOpen = false;

      // if (this.collectedRewards.length === 3) {
      //   this.gameOver();
      // }
    };

    this.chooseRewardScreen = new ChooseRewardScreen(
      this,
      this.gw / 2,
      this.gh / 2,
      index
    );

    this.offAllAudio();
    rewardAudio = this.chooseRewardScreen.getRewardAudio();

    this.game.audio.vo.play(rewardAudio);

    this.chooseRewardScreen.setCallbackWhenOff(cb);
  }

  addRewardToCollection() {
    this.isQuestionBoardOpen = true;
    this.isThrowing = true;
    const offsetX = 50;
    const x =
      this.collectedRewards.length === 0
        ? 140
        : this.collectedRewards[this.collectedRewards.length - 1].x + offsetX;
    let y = 435;
    let texture = this.selectedReward;

    const reward = this.add.image(x, y, texture).setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: reward,
      scale: 1.2,
      yoyo: true,
      duration: 1000,
      onComplete: () => {
        this.isQuestionBoardOpen = false;
        this.isThrowing = false;
        if (this.collectedRewards.length === 3) {
          this.gameOver();
        }
      },
    });

    this.collectedRewards.push(reward);
  }
}
