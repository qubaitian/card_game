import { Scene } from 'phaser';
import { Language } from '../config/lang';
import window from '../config/window';

export class UIBar {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
        this.create();
    }

    private create() {
        // Create a semi-transparent black background for the UI bar
        const ui_background = this.scene.add.rectangle(0, 100, window.width, 60, 0x000000, 0.7)
            .setOrigin(0, 0);

        // Add life points display (left side)
        const heart_icon = this.scene.add.image(window.width * 1 / 20, window.height * 1 / 11, 'heart-icon')
            .setScale(0.5);
        const life_text = this.scene.add.text(window.width * 1 / 20 + 15, window.height * 1 / 11, '100/100', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);

        // Add buttons (right side)
        const createButton = (x: number, text: string, callback: () => void) => {
            const button = this.scene.add.container(x, window.height * 1 / 10);

            const bg = this.scene.add.rectangle(0, 0, 120, 80, 0x444444)
                .setInteractive()
                .on('pointerdown', callback)
                .on('pointerover', () => bg.setFillStyle(0x666666))
                .on('pointerout', () => bg.setFillStyle(0x444444));

            const buttonText = this.scene.add.text(0, 0, text, {
                fontSize: '16px',
                color: '#ffffff'
            }).setOrigin(0.5);

            button.add([bg, buttonText]);
            return button;
        };
        // Create Deck button
        const deckButton = createButton(window.width * 7 / 10, 'Deck', () => {
            console.log('Open deck view');
            // Add your deck view logic here
            
        });

        // Create Path button
        const pathButton = createButton(window.width * 8 / 10, 'Path', () => {
            console.log('Open path view');
            // Add your path view logic here
        });

        // Create Language toggle button
        const langButton = createButton(window.width * 9 / 10, 'EN/中', () => {
            const currentLang = this.scene.registry.get('language') as Language;
            const newLang: Language = currentLang === 'en' ? 'zh' : 'en';
            this.scene.registry.set('language', newLang);
            console.log(`Restarting scene ${currentLang} to ${newLang}`);
            this.scene.scene.restart();
        });

    }
} 