import { Game as MainGame } from './scenes/Game';
import { SelectHero } from './scenes/SelectHero';
import { AUTO, Game, Types, Scale } from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    scale: {
        mode: Scale.RESIZE,
        parent: 'game-container',
        width: '100%',
        height: '100%',
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

