import { Scene } from 'phaser';
import { api } from '../common';
import { cardOptions } from '../config/card';

interface Card {
    id: number;
    title: string;
    content: string;
}

export class CardFactory {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createCard(x: number, y: number, card: Card) {
        // Create a container to hold all card elements
        const container = this.scene.add.container(x, y);

        // Add the card rectangle with border and light background
        const cardSprite = this.scene.add.rectangle(0, 0, cardOptions.cardWidth, cardOptions.cardHeight, 0xFFFFFF, 0.9);

        // Add title text with dark color
        const titleText = this.scene.add.text(0, -120, card.title, {
            fontSize: '24px',
            color: '#000000',
        }).setOrigin(0.5);

        // Add content text with dark color
        const contentText = this.scene.add.text(0, -50, card.content, {
            fontSize: '18px',
            color: '#000000',
            wordWrap: { width: cardOptions.cardWidth * 0.7 }
        }).setOrigin(0.5);

        // Add all elements to the container
        container.add([cardSprite, titleText, contentText]);

        // Make the container interactive
        container.setSize(cardSprite.width, cardSprite.height);
        container.setInteractive();

        // Add hover effects
        container.on('pointerover', () => {
            this.scene.tweens.add({
                targets: container,
                scaleX: 1.05,
                scaleY: 1.05,
                y: y - 10,
                duration: 200,
                ease: 'Power2'
            });
        });

        container.on('pointerout', () => {
            this.scene.tweens.add({
                targets: container,
                scaleX: 1,
                scaleY: 1,
                y: y,
                duration: 200,
                ease: 'Power2'
            });
        });

        // Add click handler
        container.on('pointerup', async () => {
            // Send the selected hero to the server
            const result = await api.heroSelectHeroSelectPost({
                hero_id: card.id,
                user_id: 1 // You'll need to get the actual user ID from your auth system
            });
            console.log(result);

            // 保存英雄ID到游戏状态和localStorage
            localStorage.setItem('selectedHeroId', card.id.toString());
        });

        return container;
    }

} 