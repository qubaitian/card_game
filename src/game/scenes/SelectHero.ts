import { Scene } from 'phaser';
import { lang, Language } from '../config/lang';
import { UIBar } from '../components/UIBar';
import window from '../config/window';
import { CardFactory } from '../components/Card';

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
            {
                id: 1,
                title: texts.heroes[0].title,
                content: texts.heroes[0].content,
            }
        );
        cardFactory.createCard(
            window.width * 2 / 4,
            window.height / 2,
            {
                id: 2,
                title: texts.heroes[1].title,
                content: texts.heroes[1].content,
            }
        );
        cardFactory.createCard(
            window.width * 3 / 4,
            window.height / 2,
            {
                id: 3,
                title: texts.heroes[2].title,
                content: texts.heroes[2].content,
            }
        );
    }
} 