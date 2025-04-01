import { Scene } from 'phaser';
import { TextEdit } from 'phaser3-rex-plugins/plugins/textedit';


export function createButton(scene: Scene, x: number, y: number, width: number, height: number, text: string, callback: () => void) {
    const button = scene.add.container(x, y);

    const bg = scene.add.rectangle(0, 0, width, height, 0x444444)
        .setInteractive()
        .on('pointerup', callback)
        .on('pointerover', () => bg.setFillStyle(0x666666))
        .on('pointerout', () => bg.setFillStyle(0x444444));

    const buttonText = scene.add.text(0, 0, text, {
        fontSize: '16px',
        color: '#ffffff'
    }).setOrigin(0.5);

    button.add([bg, buttonText]);
    return button;
}

export function createInputField(scene: Scene, x: number, y: number, width: number, height: number, text: string) {
    const inputField = scene.add
        .text(x, y, text, {
            fixedWidth: width,
            fixedHeight: height,
            backgroundColor: '#ffffff',
            color: '#000000',
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            new TextEdit(inputField).open();
        });

    return inputField;
}