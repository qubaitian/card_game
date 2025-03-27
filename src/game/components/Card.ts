import { Scene } from 'phaser';
import window_config from '../config/window_config';
import { Card } from '../server_api/api';


export function createCard(scene: Scene, x: number, y: number, card: Card, onPointerUp: (id: number) => void) {
    // Create a container to hold all card elements
    const container = scene.add.container(x, y);

    // Add the card rectangle with border and light background
    const cardSprite = scene.add.rectangle(0, 0, window_config.width / 6, window_config.height / 2.2, 0xFFFFFF, 0.9);

    // Add title text with dark color
    const titleText = scene.add.text(0, -cardSprite.height * 0.35, card.text[scene.registry.get('language')].title, {
        fontSize: '24px',
        color: '#000000',
    }).setOrigin(0.5);

    const contentText = scene.add.text(0, cardSprite.height * 0.2, card.text[scene.registry.get('language')].content, {
        color: '#000000',
        wordWrap: { width: cardSprite.width * 0.8 }
    }).setOrigin(0.5);

    // Add all elements to the container
    container.add([cardSprite, titleText, contentText]);

    // Make the container interactive
    container.setSize(cardSprite.width, cardSprite.height);
    container.setInteractive();

    // Add hover effects
    container.on('pointerover', () => {
        scene.tweens.add({
            targets: container,
            scaleX: 1.05,
            scaleY: 1.05,
            y: y - 10,
            duration: 200,
            ease: 'Power2'
        });
    });

    container.on('pointerout', () => {
        scene.tweens.add({
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
        onPointerUp(card.id);
    });

    return card.id;
}

