import { Scene } from 'phaser';
import { game_api } from '../components/Network';
import { createCard } from '../components/Card';
import window_config from '../config/window_config';


export class STSSelectHero extends Scene {

    constructor() {
        super({ key: 'STSSelectHero' });
    }

    async create() {
        const res = await game_api.heroListGameSTSHeroListGet();
        createCard(this, window_config.width * 3 / 12, window_config.height / 2, res.data[0], () => {
            console.log('clicked');
        });
        createCard(this, window_config.width * 6 / 12, window_config.height / 2, res.data[1], () => {
            console.log('clicked');
        });
        createCard(this, window_config.width * 9 / 12, window_config.height / 2, res.data[2], () => {
            console.log('clicked');
        });
        
    }
} 