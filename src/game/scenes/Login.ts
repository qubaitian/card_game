import { Scene } from 'phaser';
import window_config from '../config/window_config';
import { createButton, createInputField } from '../components/Button';
import { keypair_api, login_api, token_config } from '../components/Network';

export class Login extends Scene {

    constructor() {
        super('Login');
    }

    create() {
        // Create Phaser text input
        const inputField = createInputField(this, window_config.width / 2, window_config.height * 9 / 20, window_config.width * 4 / 10, window_config.height / 20, '');

        // 从 localStorage 恢复保存的私钥
        const savedPrivateKey = localStorage.getItem('privateKey');
        if (savedPrivateKey) {
            inputField.setText(savedPrivateKey);
            this.registry.set('privateKey', savedPrivateKey);
        }

        // Create generate keypair button
        createButton(this, window_config.width * 4 / 10, window_config.height * 11 / 20, window_config.width / 10, window_config.height / 20, 'Generate Keypair', async () => {
            console.log('Generate Keypair');
            let res = await keypair_api.getKeypairGet();
            this.registry.set('privateKey', res.data.private_key);
            inputField.setText(res.data.private_key);
        });

        // Create login button
        createButton(this, window_config.width * 6 / 10, window_config.height * 11 / 20, window_config.width / 10, window_config.height / 20, 'Login', async () => {
            console.log('Login');
            let res = await login_api.loginLoginPost({
                private_key: inputField.text
            });

            token_config.baseOptions.headers.Authorization = res.data.access_token;

            localStorage.setItem('privateKey', inputField.text);
            this.registry.set('public_key', res.data.public_key);
            this.registry.set('access_token', res.data.access_token);
            this.registry.set('private_key', inputField.text);

            this.scene.start('CurrentScene');
        });
    }
}
