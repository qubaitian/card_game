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

        // loading the sprite sheet with all cards
        this.load.spritesheet("cards", "cards.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });
    }

    create() {
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
        createCard(0, 220, "Warrior", "A mighty fighter\nwith great strength", 0);
        createCard(1000, 220, "Mage", "Master of arcane\nand magical arts", 1);
        createCard(1500, 220, "Rogue", "Swift and stealthy\nassassin", 2);
    }

    private async onHeroSelect(heroIndex: number) {
        // Send the selected hero to the server
        const result = await api.heroSelectHeroSelectPost({
            hero_id: heroIndex,
            user_id: 1 // You'll need to get the actual user ID from your auth system
        }, {method: 'POST'});
        console.log(result);
        
        // 保存英雄ID到游戏状态和localStorage
        localStorage.setItem('selectedHeroId', heroIndex.toString());
        
        this.scene.start('SelectPath');
    }
} 