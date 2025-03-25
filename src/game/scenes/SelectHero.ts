import { Scene } from 'phaser';
import { lang, Language } from '../config/lang';
import { UIBar } from '../components/UIBar';
import window from '../config/window';
import { CardFactory, headbutt } from '../components/Card';
import { api } from '../common';

export class SelectHero extends Scene {

    constructor() {
        super({ key: 'SelectHero' });
    }

    create() {
        // Create UI bar with language change callback
        new UIBar(this);

        const texts = lang[this.registry.get('language') as Language];

        // Create three hero cards with titles and descriptions
        const cardFactory = new CardFactory(this);
        cardFactory.createCard(
            window.width / 4,
            window.height / 2,
            headbutt,
            async (id: number) => {
                // Send the selected hero to the server
                const result = await api.heroSelectHeroSelectPost({
                    hero_id: id,
                    user_id: 1 // You'll need to get the actual user ID from your auth system
                });
                console.log(result);
            }
        );
        cardFactory.createCard(
            window.width * 2 / 4,
            window.height / 2,
            headbutt,
            async (id: number) => {
                // Send the selected hero to the server
                const result = await api.heroSelectHeroSelectPost({
                    hero_id: id,
                    user_id: 1 // You'll need to get the actual user ID from your auth system
                });
                console.log(result);
            }
        );
        cardFactory.createCard(
            window.width * 3 / 4,
            window.height / 2,
            headbutt,
            async (id: number) => {
                // Send the selected hero to the server
                const result = await api.heroSelectHeroSelectPost({
                    hero_id: id,
                    user_id: 1 // You'll need to get the actual user ID from your auth system
                });
                console.log(result);
            }
        );
    }
} 