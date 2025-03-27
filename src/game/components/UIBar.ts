import { Scene } from 'phaser';
import { Language } from '../config/lang';
import window_config from '../config/window_config';

export class UIBar {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
        this.create();
    }

    private create() {
        // Create a semi-transparent black background for the UI bar
        const ui_background = this.scene.add.rectangle(0, 100, window_config.width, 60, 0x000000, 0.7)
            .setOrigin(0, 0);

        // Add life points display (left side)
        const heart_icon = this.scene.add.image(window_config.width * 1 / 20, window_config.height * 1 / 11, 'heart-icon')
            .setScale(0.5);
        const life_text = this.scene.add.text(window_config.width * 1 / 20 + 15, window_config.height * 1 / 11, '100/100', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);

        // Add buttons (right side)
        const createButton = (x: number, text: string, callback: () => void) => {
            const button = this.scene.add.container(x, window_config.height * 1 / 10);

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
        if (this.scene.registry.has('hero_id')) {
            // Create Deck button
            createButton(window_config.width * 7 / 10, 'Deck', () => {
                // Create a semi-transparent black overlay
                const overlay = this.scene.add.rectangle(0, 0, window_config.width, window_config.height, 0x000000, 0.8)
                    .setOrigin(0, 0)
                    .setInteractive()
                    .setDepth(100);

                // Create a mask for the card container
                const maskShape = this.scene.add.rectangle(
                    window_config.width / 2,
                    window_config.height / 2,
                    window_config.width * 0.7,
                    window_config.height * 0.7,
                    0xffffff
                );
                maskShape.setVisible(false);
                const mask = maskShape.createGeometryMask();

                // Create a container for cards
                const cardContainer = this.scene.add.container(window_config.width / 2, window_config.height / 2)
                    .setDepth(102)
                    .setMask(mask);

                // Add some example cards (你可以根据实际的卡牌数据来展示)
                const cardWidth = 120;
                const cardHeight = 160;
                const cardsPerRow = 5;
                const padding = 20;

                // 这里应该从你的游戏数据中获取实际的卡牌
                const cards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10',
                    'card11', 'card12', 'card13', 'card14', 'card15', 'card16', 'card17', 'card18', 'card19', 'card20',
                    'card21', 'card22', 'card23', 'card24', 'card25', 'card26',
                ];

                cards.forEach((card, index) => {
                    const row = Math.floor(index / cardsPerRow);
                    const col = index % cardsPerRow;
                    const x = (col - Math.floor(cardsPerRow / 2)) * (cardWidth + padding);
                    const y = row * (cardHeight + padding) - 100;

                    const cardBg = this.scene.add.rectangle(x, y, cardWidth, cardHeight, 0x666666)
                        .setInteractive()
                        .on('pointerover', () => cardBg.setScale(1.1))
                        .on('pointerout', () => cardBg.setScale(1));

                    const cardText = this.scene.add.text(x, y, card, {
                        fontSize: '16px',
                        color: '#ffffff'
                    }).setOrigin(0.5);

                    cardContainer.add([cardBg, cardText]);
                });

                // Add scroll functionality
                let scrollY = 0;

                cardContainer.setInteractive(new Phaser.Geom.Rectangle(
                    -window_config.width * 0.35,
                    -window_config.height * 0.35,
                    window_config.width * 0.7,
                    window_config.height * 0.7
                ), Phaser.Geom.Rectangle.Contains);

                // Add scroll wheel functionality
                this.scene.input.on('wheel', (pointer: Phaser.Input.Pointer, gameObjects: any, deltaX: number, deltaY: number) => {
                    // deltaY > 0 means scrolling down
                    scrollY -= deltaY * 0.5; // Adjust 0.5 to control scroll speed

                    // Limit scrolling
                    const maxScroll = Math.max(0, (Math.ceil(cards.length / cardsPerRow) + 2) * (cardHeight + padding) - window_config.height * 0.7);
                    scrollY = Phaser.Math.Clamp(scrollY, -maxScroll, 0);

                    cardContainer.setY(window_config.height / 2 + scrollY);
                });

                // Update cleanup to include wheel event
                overlay.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                    const bounds = cardContainer.getBounds();
                    if (!Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y)) {
                        overlay.destroy();
                        cardContainer.destroy();
                        maskShape.destroy();
                        // Clean up event listeners
                        this.scene.input.off('wheel');
                    }
                });
            });

        }
        // Create Path button
        createButton(window_config.width * 8 / 10, 'Path', () => {
            console.log('Open path view');
            // Add your path view logic here
        });

        // Create Language toggle button
        createButton(window_config.width * 9 / 10, 'EN/中', () => {
            const currentLang = this.scene.registry.get('language') as Language;
            const newLang: Language = currentLang === 'en' ? 'zh' : 'en';
            this.scene.registry.set('language', newLang);
            console.log(`Restarting scene ${currentLang} to ${newLang}`);
            this.scene.scene.restart();
        });

    }
} 