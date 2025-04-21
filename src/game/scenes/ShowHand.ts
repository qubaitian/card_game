import { Scene } from 'phaser';
import window_config from '../config/window_config';
import Container from 'phaser3-rex-plugins/templates/ui/container/Container';


export class ShowHand extends Scene {

    constructor() {
        super({ key: 'ShowHand' });
    }

    preload() {

    }

    create() {
        const container = this.add.container(window_config.width * 1 / 2, window_config.height * 1 / 2, [
            this.add.image(0, 0, 'bg_attack_red'),
            this.add.image(0, 0, 'frame_attack_rare'),
            this.add.image(0, 0, 'banner_common'),
            this.add.image(0, 0, 'energy_red'),
        ]);
        container.setDepth(1);

        // 添加拖拽功能
        container.setInteractive(new Phaser.Geom.Rectangle(-100, -100, 200, 200), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(container);

        // 拖拽事件
        this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Container, dragX: number, dragY: number) => {
            console.log(pointer, gameObject, dragX, dragY);
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // 可选：开始拖拽时的视觉反馈
        this.input.on('dragstart', (pointer: any, gameObject: any) => {
            gameObject.setAlpha(0.8); // 轻微透明表示正在拖拽
        });

        // 可选：结束拖拽时恢复原状
        this.input.on('dragend', (pointer: any, gameObject: any) => {
            gameObject.setAlpha(1);
        });

        this.add.image(0, 0, 'background').setDisplaySize(window_config.width, window_config.height).setOrigin(0, 0);

    }

    update(time: number, delta: number): void {

    }
}