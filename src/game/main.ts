import { Game as MainGame } from './scenes/Game';
import { SelectHero } from './scenes/SelectHero';
import { Game, Types, Scale, AUTO } from 'phaser';
import window from './config/window';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    scale: {
        mode: Scale.FIT,
        parent: 'game-container',
        width: window.width,
        height: window.height,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        MainGame,
        SelectHero,
    ]
};

const StartGame = (parent: HTMLElement) => {
    return new Game({ ...config, parent });
}

export default StartGame;

