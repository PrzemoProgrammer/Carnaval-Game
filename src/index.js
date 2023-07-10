import Phaser from "phaser";
// import BootScene from "./scenes/BootScene";
import PreloadScene from "./scenes/PreloadScene";
import MenuScene from "./scenes/MenuScene";
import PlayScene from "./scenes/PlayScene";

const config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: 0,
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    width: 640,
    height: 480,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [PreloadScene, MenuScene, PlayScene],
};

const game = new Phaser.Game(config);
