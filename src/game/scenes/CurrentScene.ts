import { Scene } from 'phaser';
import { scene_api } from '../components/Network';
import { CurrentSceneModel, Event, Card } from '../server_api/api';
import { createCard } from '../components/Card';
import window_config from '../config/window_config';
export class CurrentScene extends Scene {

    constructor() {
        super({ key: 'CurrentScene' });
    }

    async create() {
        const res = await scene_api.currentSceneCurrentPost()
        const current_scene_model = res.data as CurrentSceneModel

        if (current_scene_model.event === Event.Battle) {
            this.scene.start('BattleScene');
        }
        if (current_scene_model.event === Event.LootOne) {
            if (current_scene_model.loot_card_list) {
                for (let i = 0; i < current_scene_model.loot_card_list.length; i++) {
                    const card = current_scene_model.loot_card_list[i] as Card
                    createCard(this, window_config.width * (10 * i + 7) / 33, window_config.height * 5 / 10, card, () => {
                        console.log('card clicked');
                    });
                }
            }
        }
        if (current_scene_model.event === Event.LootAny) {
            this.scene.start('LootAnyScene');
        }

    }
}