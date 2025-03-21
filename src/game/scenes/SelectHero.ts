import { Scene } from 'phaser';
import { api } from '../common';

let gameOptions = {

    // card width, in pixels
    cardWidth: 334,

    // card height, in pixels
    cardHeight: 440,

    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 1
}

export class SelectHero extends Scene {
    constructor() {
        super({ key: 'SelectHero' });
    }

    preload() {
        this.load.setPath('assets');

        // Add UI assets
        this.load.image('button-bg', 'star.png');  // You'll need to add this asset
        this.load.image('heart-icon', 'star.png'); // You'll need to add this asset

        // loading the sprite sheet with all cards
        this.load.spritesheet("cards", "cards.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });
    }

    create() {
        // Add UI bar first
        this.createUIBar();

        // Helper function to create a card with text
        const createCard = (x: number, y: number, title: string, content: string, index: number) => {
            // Create a container to hold all card elements
            const container = this.add.container(x, y);
            
            // Add the card sprite as background
            const cardSprite = this.add.sprite(0, 0, "cards", index)
                .setScale(gameOptions.cardScale);
            
            // Add title text
            const titleText = this.add.text(0, -120, title, {
                fontSize: '24px',
                color: '#000000',
            }).setOrigin(0.5);
            
            // Add content text
            const contentText = this.add.text(0, -50, content, {
                fontSize: '18px',
                color: '#000000',
                wordWrap: { width: gameOptions.cardWidth * 0.7 }
            }).setOrigin(0.5);
            
            // Add all elements to the container
            container.add([cardSprite, titleText, contentText]);
            
            // Make the container interactive
            container.setSize(cardSprite.width * gameOptions.cardScale, cardSprite.height * gameOptions.cardScale);
            container.setInteractive();
            
            // Add click handler
            container.on('pointerdown', () => this.onHeroSelect(index));
            
            return container;
        };

        // Create three hero cards with titles and descriptions
        createCard(gameOptions.cardWidth * 0.5, gameOptions.cardHeight * 1, "Warrior", "A mighty fighter\nwith great strength", 0);
        createCard(gameOptions.cardWidth * 1.5, gameOptions.cardHeight * 1, "Mage", "Master of arcane\nand magical arts", 1);
        createCard(gameOptions.cardWidth * 2.5, gameOptions.cardHeight * 1, "Rogue", "Swift and stealthy\nassassin", 2);
    }

    private createUIBar() {
        // Create a semi-transparent black background for the UI bar
        const uiBackground = this.add.rectangle(0, 0, this.cameras.main.width, 60, 0x000000, 0.7)
            .setOrigin(0, 0);

        // Add life points display (left side)
        const heartIcon = this.add.image(20, 30, 'heart-icon')
            .setScale(0.5);
        const lifeText = this.add.text(50, 20, '100/100', {
            fontSize: '24px',
            color: '#ffffff'
        });

        // Add buttons (right side)
        const createButton = (x: number, text: string, callback: () => void) => {
            const button = this.add.container(x, 30);
            
            const bg = this.add.rectangle(0, 0, 120, 40, 0x444444)
                .setInteractive()
                .on('pointerdown', callback)
                .on('pointerover', () => bg.setFillStyle(0x666666))
                .on('pointerout', () => bg.setFillStyle(0x444444));
            
            const buttonText = this.add.text(0, 0, text, {
                fontSize: '16px',
                color: '#ffffff'
            }).setOrigin(0.5);
            
            button.add([bg, buttonText]);
            return button;
        };

        // Create Deck button
        const deckButton = createButton(this.cameras.main.width - 260, 'Deck', () => {
            console.log('Open deck view');
            // Add your deck view logic here
        });

        // Create Path button
        const pathButton = createButton(this.cameras.main.width - 130, 'Path', () => {
            console.log('Open path view');
            // Add your path view logic here
        });
    }

    private async onHeroSelect(heroIndex: number) {
        // Send the selected hero to the server
        const result = await api.heroSelectHeroSelectPost({
            hero_id: heroIndex,
            user_id: 1 // You'll need to get the actual user ID from your auth system
        });
        console.log(result);
        
        // 保存英雄ID到游戏状态和localStorage
        localStorage.setItem('selectedHeroId', heroIndex.toString());
        
        this.scene.start('SelectPath');
    }
} 