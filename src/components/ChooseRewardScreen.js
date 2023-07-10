import Reward from "../components/Rerward";

export default class ChooseRewardScreen extends Phaser.GameObjects.Container {
  constructor(scene, x, y, index) {
    super(scene, x, y);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.index = index;

    this.scene.add.existing(this);

    this.selectedReward = "";
    this.callback = null;

    this.rewards = {
      reward_1: ["necklace", "frog", "duck"],
      reward_2: ["crown", "wand", "dog"],
      reward_3: ["panda", "dragon", "guitar"],
    };

    this.rewardsText = ["small", "medium", "large"];

    this.isRewardSelected = false;
    this.timeToOff = 3000;

    this.background = this.addBackground(0, 0);
    this.chooseRewardText = this.addChooseRewardText(
      this.background.x,
      this.background.y - 120
    );

    this.containerItems = [this.background, this.chooseRewardText];
    this.add(this.containerItems);

    this.addRewards();
    this.setChooseRewardText();
  }

  addBackground(x, y) {
    return this.scene.add
      .image(x, y, "gameOverBg")
      .setOrigin(0.5, 0.5)
      .setVisible(true);
  }

  addRewards() {
    const rewardKey = Object.keys(this.rewards);
    const reward = this.rewards[rewardKey[this.index]];

    for (let i = 0; i <= 2; i++) {
      const x = -280 + 193 * i;
      const y = -20;
      const texture = reward[i];

      this.addReward(x, y, texture);
    }

    this.add(this.containerItems);
  }

  addReward(x, y, texture) {
    const reward = new Reward(this.scene, x + 88, y + 70, texture);

    reward.onClick(() => {
      if (this.isRewardSelected) return;
      this.isRewardSelected = true;
      this.selectedReward = texture;
      reward.setSelected();

      this.scene.time.delayedCall(this.timeToOff, () => {
        this.callback();
        this.destroy();
      });
    });

    this.containerItems.push(reward);
  }

  addChooseRewardText(x, y) {
    return this.scene.add
      .text(x, y, "", {
        fontFamily: "bangers",
        fontSize: "25px",
        color: "#000000",
        stroke: "#000000",
        wordWrap: { width: 400 },
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setOrigin(0.5);
  }

  setCallbackWhenOff(cb) {
    this.callback = cb;
  }

  getReward() {
    return this.selectedReward;
  }

  setChooseRewardText() {
    const rewardSize = this.rewardsText[this.index];
    const text =
      "YOU'EARNED ENOUGh POINTS FOR A " +
      rewardSize +
      " PRIZE! SELECT THE ONE YOU WOULD LIKE.";
    this.chooseRewardText.setText(text);
  }

  getRewardAudio() {
    let audioKey = "";

    if (this.index === 0) {
      audioKey = "small_prize";
    } else if (this.index === 1) {
      audioKey = "medium_prize";
    } else if (this.index === 2) {
      audioKey = "large_prize";
    }

    return audioKey;
  }
}
