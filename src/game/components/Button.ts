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

export function createInputField(scene: Scene, x: number, y: number, width: number, height: number, text: string, callback: (text: string) => void) {
    const inputField = scene.add
        .text(x, y, text, {
            align: 'center',
            fixedWidth: width,
            padding: { top: height / 4 },
            fixedHeight: height,
            backgroundColor: '#ffffff',
            color: '#000000',
        })
        .setOrigin(0.5)
        .setInteractive();
    inputField.on('pointerdown', () => {
        const textEdit = new TextEdit(inputField);
        textEdit.open();
        scene.registry.set('currentInputField', inputField);
    });
    scene.registry.set('currentInputField', inputField);

    scene.input.keyboard?.on('keydown-ENTER', () => {
        const currentInputField = scene.registry.get('currentInputField');
        if (inputField === currentInputField) {
            if (scene.registry.get('is_open')){
                callback(inputField.text);
                inputField.setInteractive();
                scene.registry.set('is_open', false);
                return;
            }
            scene.registry.set('is_open', true);
            const textEdit = new TextEdit(inputField);
            textEdit.open();
        }
    });

    return inputField;
}