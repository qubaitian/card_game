import { Scene } from 'phaser';
import window_config from '../config/window_config';
import { TextEdit } from 'phaser3-rex-plugins/plugins/textedit.js';
import { Button } from '../components/Button';
import { keypair_api } from '../components/Network';

export class Login extends Scene {

    constructor() {
        super('Login');
    }

    create() {
        // Create Phaser text input
        const inputField = this.add
            .text(window_config.width / 2, window_config.height * 9 / 20, '', {
                fixedWidth: window_config.width * 4 / 10,
                fixedHeight: window_config.height / 20,
                backgroundColor: '#ffffff',
                color: '#000000',
            })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                new TextEdit(inputField).open();
            });

        // 从 localStorage 恢复保存的私钥
        const savedPrivateKey = localStorage.getItem('privateKey');
        if (savedPrivateKey) {
            inputField.setText(savedPrivateKey);
            this.registry.set('privateKey', savedPrivateKey);
        }

        // Create generate keypair button
        new Button(this, window_config.width * 4 / 10, window_config.height * 11 / 20, window_config.width / 10, window_config.height / 20, 'Generate Keypair', async () => {
            console.log('Generate Keypair');
            let res = await keypair_api.getKeypairGet();
            console.log(res.data.private_key);

            this.registry.set('privateKey', res.data.private_key);
            inputField.setText(res.data.private_key);
        });

        // Create login button
        new Button(this, window_config.width * 6 / 10, window_config.height * 11 / 20, window_config.width / 10, window_config.height / 20, 'Login', () => {
            console.log('Login');
            localStorage.setItem('privateKey', inputField.text);
        });
    }
}
