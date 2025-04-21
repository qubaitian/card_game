import { Scene } from 'phaser';
import { scene_api } from '../components/Network';
import { CardData, CurrentSceneModel, Event, } from '../server_api/api';
import { createCard } from '../components/Card';
import window_config from '../config/window_config';
import { createButton, createInputField } from '../components/Button';

export class CurrentScene extends Scene {
    private chatWindow: Phaser.GameObjects.Container;
    private input_group: Phaser.GameObjects.Container;
    private chatMessages: Phaser.GameObjects.Text[];
    private ws: WebSocket;

    constructor() {
        super({ key: 'CurrentScene' });
        this.chatMessages = [];
    }

    async create() {
        this.game.events.on('ws_message', (message: string) => {
            console.log('ws_message');
            this.addChatMessage(message);
        });

        if (this.ws === undefined) {
            this.ws = this.registry.get('ws') as WebSocket;
        }
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


    private createChatWindow() {
        this.chatWindow = this.add.container(0, window_config.height * 6 / 20);

        this.input_group = this.add.container(0, 0);
        const inputField = createInputField(this, window_config.width * 1 / 20, window_config.height * 9 / 20, window_config.width * 2 / 20, window_config.height / 40, '', () => {
            if (inputField.text.trim() !== '') {
                this.ws.send(inputField.text);
                inputField.setText('');
            }
            console.log('call back in input');
        });

        const button = createButton(this, window_config.width * 5 / 40, window_config.height * 9 / 20, window_config.width * 1 / 20, window_config.height / 40, 'Send', () => {
            if (inputField.text) {
                this.ws.send(inputField.text);
                inputField.setText('');
            }
        });

        // Initially hide input field and button
        this.input_group.setVisible(false);

        this.input_group.add([inputField, button]);
        // when enter is pressed, show input field and button
        this.input.keyboard?.on('keydown-ENTER', () => {
            if (!this.input_group.visible) {
                this.input_group.setVisible(true);
            }
        });
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // 检查点击是否在聊天框区域内
            const chatBounds = this.chatWindow.getBounds();
            const isClickInChat = pointer.x >= chatBounds.x && 
                                pointer.x <= chatBounds.x + chatBounds.width &&
                                pointer.y >= chatBounds.y && 
                                pointer.y <= chatBounds.y + chatBounds.height;

            if (!this.input_group.visible && isClickInChat) {
                // 点击聊天区域时显示输入框
                this.input_group.setVisible(true);
            } else if (this.input_group.visible && !isClickInChat) {
                // 点击聊天区域外时隐藏输入框
                inputField.setActive(false);
                this.time.delayedCall(100, () => {
                    this.input_group.setVisible(false);
                });
            }
        });
        this.chatWindow.add(this.input_group);
    }

    private addChatMessage(message: string) {
        const newMessage = this.add.text(0, this.chatMessages.length * 20, message, {
            fontSize: '16px',
            color: '#ffffff'
        }).setInteractive();
        newMessage.on('pointerdown', () => {
            this.input_group.setVisible(true);
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

    update(time: number, delta: number): void {

    }
}