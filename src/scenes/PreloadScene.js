import Loading from "../utils/LoadingScreen";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.createLoadingScreen(this);
    this.loadImages();
    this.loadAudio();
  }

  create() {
    this.addAudio();
    this.addArmAnims();
  }

  startMenuScene() {
    this.scene.start("MenuScene");
  }

  addArmAnims() {
    this.anims.create({
      key: `hand-throw`,
      frames: this.anims.generateFrameNumbers(`hand-spritesheet`, {
        frames: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ],
      }),
      frameRate: 20,
      repeat: 0,
    });
  }

  createLoadingScreen(scene) {
    this.loadingScreen = new Loading(scene);
    this.loadingScreen.onComplete(() => {
      this.loadingScreen.destroy();
      this.startMenuScene();
    });
  }

  loadAudio() {
    this.load.audioSprite("sfx", "../audio/sfx.json", [
      "../audio/sfx.ogg",
      "../audio/sfx.m4a",
    ]);

    this.load.audioSprite("vo", "../audio/vo.json", [
      "../audio/vo.ogg",
      "../audio/vo.m4a",
    ]);

    this.audio = ["sfx", "vo"];
  }

  addAudio() {
    this.game.audio = {};

    this.audio.forEach(
      (name) => (this.game.audio[name] = this.sound.addAudioSprite(name))
    );
  }

  loadImages() {
    this.load.setPath("./src/assets/images");
    this.load.image("menuBg", "menuBg.png");
    this.load.image("playButton", "playButton.png");
    this.load.image("playButtonClicked", "playButtonClicked.png");
    this.load.image("gameBg", "gameBg.png");
    this.load.image("dart-up", "dart-up.png");
    this.load.image("dart-down", "dart-down.png");
    this.load.image("score-sheet", "score-sheet.png");
    this.load.image("questionBg", "questionBg.png");
    this.load.image("answerBg", "answerBg.png");
    this.load.image("selectedAnswerBg", "selectedAnswerBg.png");
    this.load.image("gameOverBg", "gameOverBg.png");
    this.load.image("duck", "duck.png");
    this.load.image("dog", "dog.png");
    this.load.image("dragon", "dragon.png");
    this.load.image("necklace", "necklace.png");
    this.load.image("frog", "frog.png");
    this.load.image("panda", "panda.png");
    this.load.image("guitar", "guitar.png");
    this.load.image("wand", "wand.png");
    this.load.image("crown", "crown.png");
    this.load.image("rewardBg", "rewardBg.png");
    this.load.image("selectedRewardBg", "selectedRewardBg.png");

    for (let i = 1; i <= 4; i++) {
      this.load.image("ballon_" + i, "ballon_" + i + ".png");
      this.load.image("pop_ballon_" + i, "pop_ballon_" + i + ".png");
    }

    this.load.spritesheet("hand-spritesheet", "hand-spritesheet.png", {
      frameWidth: 2850 / 19,
      frameHeight: 186,
    });
  }
}
