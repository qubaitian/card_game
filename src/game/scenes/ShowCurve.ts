import { Scene } from 'phaser';


export class ShowCurve extends Scene {
    private graphics: Phaser.GameObjects.Graphics;
    private curve: Phaser.Curves.QuadraticBezier;
    private path: { t: number, vec: Phaser.Math.Vector2 };
    private point1: Phaser.GameObjects.Image;
    private blocks: Phaser.GameObjects.Image[] = [];
    
    // 添加新的变量来跟踪拖拽状态
    private isDragging: boolean = false;
    private draggedObject: Phaser.GameObjects.Image | null = null;
    private dragPosition: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

    constructor() {
        super({
            key: 'ShowCurve'
        });
    }

    preload() {
        this.load.spritesheet('dragcircle', 'assets/dragcircle.png', { frameWidth: 16 });
        this.load.image('reticleBlock', 'assets/images/ui/combat/reticleBlock.png');
        this.load.image('reticleArrow', 'assets/images/ui/combat/reticleArrow.png');
    }

    create() {
        this.graphics = this.add.graphics();

        this.path = { t: 0, vec: new Phaser.Math.Vector2() };

        const startPoint = new Phaser.Math.Vector2(50, 260);
        const controlPoint1 = new Phaser.Math.Vector2(610, 25);
        const endPoint = new Phaser.Math.Vector2(735, 550);

        this.curve = new Phaser.Curves.QuadraticBezier(startPoint, controlPoint1, endPoint);

        const point0 = this.add.image(startPoint.x, startPoint.y, 'dragcircle', 0).setInteractive();
        const point1 = this.add.image(endPoint.x, endPoint.y, 'reticleArrow').setInteractive().setDepth(1);
        const point2 = this.add.image(controlPoint1.x, controlPoint1.y, 'dragcircle', 2).setInteractive();
        this.point1 = point1;
        point1.setTint(0xffcc99);

        point0.setData('vector', startPoint);
        point1.setData('vector', endPoint);
        point2.setData('vector', controlPoint1);

        point0.setData('isControl', false);
        point1.setData('isControl', false);
        point2.setData('isControl', true);

        this.input.setDraggable([point0, point1, point2]);

        this.input.on('dragstart', (pointer: any, gameObject: any) => {
            gameObject.setFrame(1);
            this.isDragging = true;
            this.draggedObject = gameObject;
        });

        this.input.on('drag', (pointer: any, gameObject: Phaser.GameObjects.Image, dragX: any, dragY: any) => {
            // 只更新拖拽位置，实际处理将在update中进行
            this.dragPosition.set(dragX, dragY);
        });

        this.input.on('dragend', (pointer: any, gameObject: any) => {
            if (gameObject.data.get('isControl')) {
                gameObject.setFrame(2);
            }
            else {
                gameObject.setFrame(0);
            }
            
            this.isDragging = false;
            this.draggedObject = null;
        });

        this.tweens.add({
            targets: this.path,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
    }

    update(delta: number, time: number) {
        // 每帧检查并处理拖拽
        if (this.isDragging && this.draggedObject) {
            const gameObject = this.draggedObject;
            const dragX = this.dragPosition.x;
            const dragY = this.dragPosition.y;
            
            // 更新对象位置
            gameObject.x = dragX;
            gameObject.y = dragY;
            
            // 更新向量数据
            gameObject.data.get('vector').set(dragX, dragY);
            
            // 清除现有块
            this.blocks.forEach(block => block.destroy());
            this.blocks = [];
            
            // 重新绘制曲线
            this.graphics.clear();
            this.curve.draw(this.graphics);
            
            // 更新箭头旋转
            this.point1.setRotation(this.curve.getTangent(1).angle() + Math.PI / 2);
            
            // 创建人行横道线效果（间隔的条纹）
            const stripeLength = 0.03;
            const gapLength = 0.03;
            
            for (let t = 0; t < 1; t += stripeLength + gapLength) {
                const startPoint = new Phaser.Math.Vector2();
                this.curve.getPoint(t, startPoint);
                const block = this.add.image(startPoint.x, startPoint.y, 'reticleBlock')
                    .setRotation(this.curve.getTangent(t).angle() + Math.PI / 2);
                this.blocks.push(block);
            }
        }
    }
}