import { Scene } from 'phaser';
import { scene_api } from '../components/Network';
import { CardData, CurrentSceneModel, Event, } from '../server_api/api';
import { createCard } from '../components/Card';
import window_config from '../config/window_config';
import { createButton, createInputField } from '../components/Button';

export class CurrentScene extends Scene {
    private chatWindow: Phaser.GameObjects.Container;
    private chatMessages: Phaser.GameObjects.Text[];
    private ws: WebSocket;

    constructor() {
        super({ key: 'CurrentScene' });
        this.chatMessages = [];
    }

    async create() {
        this.setupWebSocket();

        this.createChatWindow();

        const res = await scene_api.currentSceneCurrentPost()
        const current_scene_model = res.data as CurrentSceneModel

        if (current_scene_model.event === Event.Battle) {
            this.scene.start('BattleScene');
        }
        if (current_scene_model.event === Event.LootOne) {
            if (current_scene_model.loot_card_list) {
                for (let i = 0; i < current_scene_model.loot_card_list.length; i++) {
                    const card = current_scene_model.loot_card_list[i] as CardData
                    createCard(this, window_config.width * (9 * i + 13) / 36, window_config.height * 5 / 10, card, () => {
                        console.log('card clicked');
                        scene_api.lootOneSceneLootOnePost({ loot_id: i });
                        this.scene.start('CurrentScene');
                    });
                }
            }
        }
        if (current_scene_model.event === Event.LootAny) {
            this.scene.start('LootAnyScene');
        }
    }

    private setupWebSocket() {
        this.ws = new WebSocket('ws://localhost:8000/ws/' + this.registry.get('public_key'));

        this.ws.onmessage = (event: any) => {
            console.log(event.data);
            this.addChatMessage(event.data);
        };

        this.ws.onclose = () => {
            console.log('WebSocket连接已关闭');
        };
    }

    private createChatWindow() {
        this.chatWindow = this.add.container(200, 500);

        const background = this.add.rectangle(0, 0, 200, 400, 0x000000, 0.5);
        this.chatWindow.add(background);

        const inputField = createInputField(this, window_config.width * 1 / 10, window_config.height * 9 / 20, window_config.width * 1 / 10, window_config.height / 20, '');

        createButton(this, window_config.width * 2 / 10, window_config.height * 9 / 20, window_config.width * 1 / 10, window_config.height / 20, 'Send', () => {
            if (inputField.text) {
                this.ws.send(inputField.text);
                inputField.setText('');
            }
        });
    }

    private addChatMessage(message: string) {
        const newMessage = this.add.text(5, this.chatMessages.length * 20, message, {
            fontSize: '12px',
            color: '#ffffff'
        });

        this.chatWindow.add(newMessage);
        this.chatMessages.push(newMessage);

        if (this.chatMessages.length > 10) {
            const oldMessage = this.chatMessages.shift();
            oldMessage?.destroy();
            this.chatMessages.forEach((msg, index) => {
                msg.setY(index * 20);
            });
        }
    }
}