import { Scene } from 'phaser';


export class ShowCurve extends Scene {
    graphics: Phaser.GameObjects.Graphics;
    points: Phaser.Math.Vector2[];
    curve: Phaser.Curves.QuadraticBezier;
    path: { t: number, vec: Phaser.Math.Vector2 };

    constructor() {
        super({ key: 'ShowCurve' });
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.spritesheet('dragcircle', 'assets/dragcircle.png', { frameWidth: 16 });
    }

    create ()
    {
        this.graphics = this.add.graphics();

        this.path = { t: 0, vec: new Phaser.Math.Vector2() };

        const startPoint = new Phaser.Math.Vector2(50, 260);
        const controlPoint1 = new Phaser.Math.Vector2(610, 25);
        const endPoint = new Phaser.Math.Vector2(735, 550);

        this.curve = new Phaser.Curves.QuadraticBezier(startPoint, controlPoint1, endPoint);

        this.points = this.curve.getSpacedPoints(32);

        const point0 = this.add.image(startPoint.x, startPoint.y, 'dragcircle', 0).setInteractive();
        const point1 = this.add.image(endPoint.x, endPoint.y, 'dragcircle', 0).setInteractive();
        const point2 = this.add.image(controlPoint1.x, controlPoint1.y, 'dragcircle', 2).setInteractive();

        point0.setData('vector', startPoint);
        point1.setData('vector', endPoint);
        point2.setData('vector', controlPoint1);

        point0.setData('isControl', false);
        point1.setData('isControl', false);
        point2.setData('isControl', true);

        this.input.setDraggable([ point0, point1, point2 ]);

        this.input.on('dragstart', (pointer: any, gameObject: any) =>
        {

            gameObject.setFrame(1);

        });

        this.input.on('drag', (pointer: any, gameObject: any, dragX: any, dragY: any) =>
        {

            gameObject.x = dragX;
            gameObject.y = dragY;

            gameObject.data.get('vector').set(dragX, dragY);

            //  Get 32 points equally spaced out along the curve
            this.points = this.curve.getSpacedPoints(32);

        });

        this.input.on('dragend', (pointer: any, gameObject: any) =>
        {

            if (gameObject.data.get('isControl'))
            {
                gameObject.setFrame(2);
            }
            else
            {
                gameObject.setFrame(0);
            }

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

    update ()
    {
        this.graphics.clear();

        // 绘制人行横道线效果（而不是连续曲线）
        this.graphics.lineStyle(10, 0xffffff, 1); // 更粗的白色线条

        // 创建人行横道线效果（间隔的条纹）
        const stripeLength = 0.03; // 每个条纹的长度比例
        const gapLength = 0.03;    // 每个间隙的长度比例
        
        for (let t = 0; t < 1; t += stripeLength + gapLength) {
            // 绘制曲线的一小段作为条纹
            const startPoint = new Phaser.Math.Vector2();
            const endPoint = new Phaser.Math.Vector2();
            
            this.curve.getPoint(t, startPoint);
            this.curve.getPoint(Math.min(t + stripeLength, 1), endPoint);
            
            this.graphics.beginPath();
            this.graphics.moveTo(startPoint.x, startPoint.y);
            this.graphics.lineTo(endPoint.x, endPoint.y);
            this.graphics.strokePath();
        }

        // 绘制移动点t
        this.curve.getPoint(this.path.t, this.path.vec);

        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 50);
    }
}