import { Scene } from 'phaser';
import { lang, Language } from '../config/lang';
import { UIBar } from '../components/UIBar';
import window_config from '../config/window_config';
import { CardFactory, headbutt } from '../components/Card';

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
            window_config.width / 4,
            window_config.height / 2,
            headbutt,
            () => {
                console.log('headbutt');
            }
        );
        cardFactory.createCard(
            window_config.width * 2 / 4,
            window_config.height / 2,
            headbutt,
            () => {
                console.log('headbutt');
            }
        );
        cardFactory.createCard(
            window_config.width * 3 / 4,
            window_config.height / 2,
            headbutt,
            () => {
                console.log('headbutt');
            }
        );
    }
} 