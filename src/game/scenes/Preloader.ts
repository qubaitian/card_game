import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.image('banner_common', 'assets/card/banner_common.png');
        // 加载所有游戏资源
        this.load.pack('all', 'assets/pack.json');
        
        // 在这里添加其他需要加载的资源

        if (!this.registry.has('language')) {
            this.registry.set('language', 'en');
        }
        // 在这里继续加载其他资源...
    }

    create() {
        this.scene.start('Login');
    }
} 