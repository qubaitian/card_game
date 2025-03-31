import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // 开始加载所有资源
        this.load.setPath('assets');
        
        // 加载所有游戏资源
        // this.load.image('star', 'star.png');
        // this.load.image('background', 'bg.png');
        // this.load.image('logo', 'logo.png');
        // this.load.image('bg', 'bg.png');
        // 在这里添加其他需要加载的资源

        if (!this.registry.has('language')) {
            this.registry.set('language', 'en');
        }

    }

    create() {
        this.scene.start('Login');
    }
} 