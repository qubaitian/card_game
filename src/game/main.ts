import { Game, Types, Scale, AUTO } from 'phaser';
import window_config from './config/window_config';
import { Preloader } from './scenes/Preloader';
import { Login } from './scenes/Login';
import { SelectMode } from './scenes/SelectMode';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'



//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    scale: {
        mode: Scale.FIT,
        parent: 'game-container',
        width: window_config.width,
        height: window_config.height,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Preloader,  // 添加 Preloader 作为第一个场景
        Login,
        SelectMode,
    ],
    parent: 'phaser-container',
	dom: {
        createContainer: true
    },
	plugins: {
		scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI'
			}
		]
    }
};

const StartGame = (parent: HTMLElement) => {
    return new Game({ ...config, parent });
}

export default StartGame;

