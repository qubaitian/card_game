import { Scene } from 'phaser';
import window_config from '../config/window_config';
import Container from 'phaser3-rex-plugins/templates/ui/container/Container';


export class SelectMode extends Scene {
    private clouds: Phaser.GameObjects.Group;

    constructor() {
        super({ key: 'SelectMode' });
    }

    preload() {
        this.load.image('background', 'assets/select_mode_backgroud.png');
        this.load.image('cloud1', 'assets/cloud1.png');
        this.load.image('cloud2', 'assets/cloud2.png');
        this.load.image('cloud3', 'assets/cloud3.png');
    }

    create() {
        this.add.image(0, 0, 'background').setDisplaySize(window_config.width, window_config.height).setOrigin(0, 0);

        // 添加云彩（动态移动）
        this.clouds = this.add.group();
        for (let i = 0; i < 10; i++) {
            let cloud = this.add.image(
                Phaser.Math.Between(0, window_config.width),
                Phaser.Math.Between(0, window_config.height * 3 / 4),
                Phaser.Math.Between(0, 2) === 0 ? 'cloud1' : Phaser.Math.Between(0, 2) === 1 ? 'cloud2' : 'cloud3'
            )
                .setAlpha(Phaser.Math.Between(0.3, 0.8))
                .setScale(Phaser.Math.Between(0.5, 1.5))
                .setDisplaySize(Phaser.Math.Between(200, 400), Phaser.Math.Between(100, 200))
                ;
            this.clouds.add(cloud);
        }

        // 创建菜单选项
        this.createMenuItem(window_config.width * 1 / 10, window_config.height * 28 / 40, '开始游戏', () => {
            console.log('开始游戏');
            this.scene.start('CurrentScene');
        });
        this.createMenuItem(window_config.width * 1 / 10, window_config.height * 31 / 40, '设定', () => {
            console.log('设定');
        });
        this.createMenuItem(window_config.width * 1 / 10, window_config.height * 34 / 40, '补丁内容', () => {
            console.log('补丁内容');
        });
        this.createMenuItem(window_config.width * 1 / 10, window_config.height * 37 / 40, '退出', () => {
            console.log('退出');
        });

        this.createMenuItem(window_config.width * 3 / 10, window_config.height * 28 / 40, '展示曲线', () => {
            console.log('展示曲线');
            this.scene.start('ShowCurve');
        });
        this.createMenuItem(window_config.width * 3 / 10, window_config.height * 31 / 40, '展示拖拽', () => {
            console.log('展示拖拽');
            this.scene.start('ShowDrag');
        });
        this.createMenuItem(window_config.width * 3 / 10, window_config.height * 34 / 40, '展示neow', () => {
            console.log('展示neow');
            this.scene.start('ShowNeow');
        });

        this.createMenuItem(window_config.width * 5 / 10, window_config.height * 28 / 40, '展示战斗', () => {
            console.log('展示战斗');
            this.scene.start('ShowBattle');
        });

        this.createMenuItem(window_config.width * 5 / 10, window_config.height * 31 / 40, '选择纹理', () => {
            console.log('选择纹理');
            this.scene.start('SelectTexture');
        });

        this.createMenuItem(window_config.width * 5 / 10, window_config.height * 34 / 40, '展示手牌', () => {
            console.log('展示手牌');
            this.scene.start('ShowHand');
        });
    }

    // 创建带有鼠标悬停效果的菜单项
    private createMenuItem(x: number, y: number, text: string, onClick: () => void) {
        // 创建背景矩形（初始不可见）
        const padding = 20; // 文本周围的内边距
        const bg = this.add.rectangle(
            x, 
            y, // 调整使矩形垂直居中于文本
            200, // 宽度，根据需要调整
            70,  // 高度，根据需要调整
            0xFFFF00 // 黄色
        )
        .setOrigin(0, 0)
        .setAlpha(0); // 初始不可见

        // 创建文本
        const textObj = this.add.text(x, y, text, { 
            fontSize: 48, 
            color: '#fff'
        }).setOrigin(0, 0);
        
        // 使文本可交互
        textObj.setInteractive({ useHandCursor: true });
        
        // 鼠标悬停事件
        textObj.on('pointerover', () => {
            bg.setAlpha(0.5); // 显示背景
        });
        
        // 鼠标离开事件
        textObj.on('pointerout', () => {
            bg.setAlpha(0); // 隐藏背景
        });

        
        // 可选：点击事件
        textObj.on('pointerdown', onClick);
        return { bg, text: textObj };
    }

    update(time: number, delta: number): void {
        this.clouds.children.iterate(cloud => {
            (cloud as Phaser.GameObjects.Image).x += 0.2;
            if ((cloud as Phaser.GameObjects.Image).x > window_config.width + 100) {
                (cloud as Phaser.GameObjects.Image).x = -100;
            }
            return true;
        });
    }
}