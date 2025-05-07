import { Scene } from 'phaser';
import window_config from '../config/window_config';
export class ShowHand extends Scene {
    private cards: Phaser.GameObjects.Container[] = [];
    
    constructor() {
        super({ key: 'ShowHand' });
    }

    preload() {
        // 预加载资源（如果需要）
    }

    create() {
        // 创建10张卡牌并以圆弧形式排列
        const card_num = 10;
        const card_list = [];
        for (let i = 0; i < card_num; i++) {
            const card = this.create_one_card(i);
            card_list.push(card);
        }
        this.cards = card_list;
        this.createCards(card_list);
    }

    update(time: number, delta: number): void {
        // 更新逻辑（如果需要）
    }
    
    private create_one_card(index: number): Phaser.GameObjects.Container {
        const container = this.add.container(window_config.width * 1 / 2, window_config.height * 1 / 2, [
            this.add.image(0, 0, 'bg_attack_red'),
            this.add.image(0, 0, 'frame_attack_rare'),
            this.add.image(0, 0, 'banner_common'),
            this.add.image(-230, -330, 'card_red_orb'),
            this.add.text(0, 0, index.toString(), { fontSize: 60, color: '#000000' }),
        ]);
        container.setDepth(1);
        container.setScale(0.5);

        // 添加拖拽功能
        container.setInteractive(new Phaser.Geom.Rectangle(-100, -100, 200, 200), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(container);

        // 拖拽事件
        container.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            console.log(pointer, dragX, dragY);
            container.x = dragX;
            container.y = dragY;
        });

        // 可选：开始拖拽时的视觉反馈
        container.on('dragstart', (pointer: any) => {
            container.setAlpha(0.8); // 轻微透明表示正在拖拽
        });

        // 可选：结束拖拽时恢复原状
        container.on('dragend', (pointer: any) => {
            container.setAlpha(1);
            this.cards.splice(this.cards.indexOf(container), 1);
            // 整理卡牌
            console.log(this.cards);
            this.createCards(this.cards);
            container.destroy();
        });

        return container;
        
    }

    private createCards(card_list: Phaser.GameObjects.Container[]): void {
        console.log(card_list.length);
        const cardWidth = 256;
        const cardHeight = 256;
        const numCards = card_list.length;
        
        // 圆弧的参数
        const arcRadius = window_config.height * 2; // 圆弧半径
        const arcAngleRange = Math.PI * 1 / 5; // 圆弧角度范围（90度）
        const centerX = window_config.width / 2;
        const centerY = window_config.height * 35 / 12; // 圆心在屏幕下方
        
        // 创建卡牌
        for (let i = 0; i < numCards; i++) {
            // 计算卡牌在圆弧上的位置
            const angle = -Math.PI / 2 - arcAngleRange / 2 + (arcAngleRange / (numCards - 1)) * i;
            const x = centerX + arcRadius * Math.cos(angle);
            const y = centerY + arcRadius * Math.sin(angle);
            
            // 创建卡牌（长方形）
            const card = card_list[i];
            card.setPosition(x, y);
            
            // 根据角度旋转卡牌
            const rotationAngle = angle + Math.PI / 2; // 调整卡牌的朝向
            card.setRotation(rotationAngle);
        }
    }
}