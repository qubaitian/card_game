import { Scene } from 'phaser';
import window_config from '../config/window_config';
import { TextEdit } from 'phaser3-rex-plugins/plugins/textedit.js';
import { Button } from '../components/Button';
import { defaultApi } from '../server_api';
import { UserResponse } from '../server_api/api';

export class Login extends Scene {
    private button: Phaser.GameObjects.Text;
    private textEdit: TextEdit;

    constructor() {
        super('Login');
    }

    create() {
        // Create Phaser text input
        const inputFieldText = this.registry.get('privateKey');
        const inputField = this.add.text(window_config.width / 2, window_config.height * 9 / 20, inputFieldText, {
            fixedWidth: window_config.width * 4 / 10,
            fixedHeight: window_config.height / 20,
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: { x: 10, y: 5 },
        })
            .setOrigin(0.5)
            .setInteractive();

        // Add pointer down listener
        inputField.on('pointerdown', () => {
            new TextEdit(inputField).open();
        });

        // Create generate keypair button
        new Button(this, window_config.width * 4 / 10, window_config.height * 11 / 20, window_config.width / 10, window_config.height / 20, 'Generate Keypair', async () => {
            console.log('Generate Keypair');
            let res = await defaultApi.generateKeypairGenerateKeypairGet();
            console.log(res.data.);

            inputField.setText(res.data[0].public_key);
        });

        // Create login button
        new Button(this, window_config.width * 6 / 10, window_config.height * 11 / 20, window_config.width / 10, window_config.height / 20, 'Login', () => {
            console.log('Login');
        });
    }
}
