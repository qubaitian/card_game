import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // 创建加载进度条
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 520, 50);

        // 显示加载进度
        this.load.on('progress', (value: number) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 500 * value, 30);
        });

        // 资源加载完成后清除进度条
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
        });

        // 开始加载所有资源
        this.load.setPath('assets');
        
        // 加载所有游戏资源
        this.load.image('star', 'star.png');
        this.load.image('background', 'bg.png');
        this.load.image('logo', 'logo.png');
        this.load.image('bg', 'bg.png');
        // 在这里添加其他需要加载的资源

        if (!this.registry.has('language')) {
            this.registry.set('language', 'en');
        }

        // Add UI assets
        this.load.image('button-bg', 'star.png');  // You'll need to add this asset
        this.load.image('heart-icon', 'star.png'); // You'll need to add this asset

    }

    create() {
        this.scene.start('Login');
    }
} 