import { Scene } from 'phaser';

export class Preloader extends Scene {
    private loadingBar: Phaser.GameObjects.Graphics;
    private loadingText: Phaser.GameObjects.Text;
    
    constructor() {
        super('Preloader');
    }

    preload() {
        // 创建加载进度条
        this.createLoadingBar();
        
        // 监听加载进度
        this.load.on('progress', (value: number) => {
            this.updateLoadingBar(value);
        });
        
        // 监听加载完成
        this.load.on('complete', () => {
            this.loadingBar.destroy();
            if (this.loadingText) this.loadingText.destroy();
        });
        

        // 加载所有游戏资源
        this.load.pack('all', 'image/pack.json');
        
        // 在这里添加其他需要加载的资源

        if (!this.registry.has('language')) {
            this.registry.set('language', 'en');
        }
        // 加载字体
        this.load.font('bold', 'font/zhs/SourceHanSerifSC-Bold.otf');
        this.load.font('regular', 'font/zhs/NotoSansMonoCJKsc-Regular.otf');
        this.load.font('medium', 'font/zhs/SourceHanSerifSC-Medium.otf');
        // 在这里继续加载其他资源...
    }

    create() {
        this.scene.start('Login');
    }
    
    private createLoadingBar() {
        // 获取游戏画布中心位置
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // 创建加载文本
        this.loadingText = this.add.text(width / 2, height / 2 - 50, '加载中...', {
            font: '24px Arial',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // 创建进度条背景
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0x222222, 0.8);
        this.loadingBar.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
    }
    
    private updateLoadingBar(value: number) {
        // 清除之前的进度
        this.loadingBar.clear();
        
        // 绘制背景
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.loadingBar.fillStyle(0x222222, 0.8);
        this.loadingBar.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
        
        // 绘制进度
        this.loadingBar.fillStyle(0x00ff00, 1);
        this.loadingBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        
        // 更新进度文本
        const percent = Math.floor(value * 100);
        this.loadingText.setText(`加载中... ${percent}%`);
    }
} 