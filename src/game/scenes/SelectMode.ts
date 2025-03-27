import { Scene } from "phaser";
import { Button } from "../components/Button";
import window_config from "../config/window_config";


export class SelectMode extends Scene {

    constructor() {
        super({ key: 'SelectMode' });
    }

    create() {
        new Button(this, window_config.width * 5 / 10, window_config.height * 3 / 10, window_config.width / 4, window_config.height / 20, 'continue', () => {
            this.scene.start('Continue');
        });

        new Button(this, window_config.width * 5 / 10, window_config.height * 4 / 10, window_config.width / 4, window_config.height / 20, 'slay the spire a20', () => {
            this.scene.start('SelectNeon');
        });

        new Button(this, window_config.width * 5 / 10, window_config.height * 5 / 10, window_config.width / 4, window_config.height / 20, 'test pve', () => {
            this.scene.start('Game');
        });

        new Button(this, window_config.width * 5 / 10, window_config.height * 6 / 10, window_config.width / 4, window_config.height / 20, 'test pvp', () => {
            this.scene.start('Game');
        });
    }
} 