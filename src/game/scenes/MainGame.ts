import { Scene } from 'phaser';

export class MainGame extends Scene
{
    constructor ()
    {
        super('MainGame');
    }

    create ()
    {
        this.add.image(512, 384, 'background');
        this.add.image(512, 350, 'logo').setDepth(100);
        this.add.text(512, 490, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
    

        // Support both touch/pointer and keyboard input
        this.input.on('pointerdown', () => {
            this.scene.start('SelectHero');
        });

        // Keep keyboard support as well
        this.input.keyboard?.addKey('SPACE').on('down', () => {
            this.scene.start('SelectHero');
        });
    }
}
