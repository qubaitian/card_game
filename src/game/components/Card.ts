import { Scene } from 'phaser';
import { api } from '../common';
import { cardOptions } from '../config/card';

interface Player {
    health: number;
    PermanentCards: CardData[];
    drawPile: CardData[];
    handCards: Map<number, CardData>;
    discardCardsMap: Map<number, CardData>;
    consumedCardsMap: Map<number, CardData>;
}

interface CardData {
    id: number;
    text: {
        [key: string]: {
            title: string;
            content: string;
        }
    }
}

class Card implements CardData {
    id: number;
    text: {
        [key: string]: {
            title: string;
            content: string;
        }
    }
    choose_effect: (player: Player, target: Player) => void = () => {};
    play_effect: (player: Player, target: Player, discard_card_index: number[]) => void = () => {};
    after_battle_effect: (player: Player, target: Player) => void = () => {};
    before_battle_effect: (player: Player, target: Player) => void = () => {};
    after_turn_effect: (player: Player, target: Player) => void = () => {};
    before_turn_effect: (player: Player, target: Player) => void = () => {};
}

export const headbutt_data : CardData = {
    id: 0,
    text: {
        "zh": {
            title: "头槌",
            content: "对目标造成1点伤害, 选择弃牌堆的一张牌,返回抽牌堆顶"
        },
        "en": {
            title: "Headbutt",
            content: "Deal 1 damage to the target, choose a card from the discard pile, and return it to the draw pile top"
        }
    }
}

export const headbutt : Card = {
    ...headbutt_data,
    choose_effect: (source: Player, target: Player) => {
        source.drawPile.push(headbutt_data);
    },
    play_effect: (source: Player, target: Player, discard_card_index: integer[]) => {
        target.health -= 1;

        // Get the card from discard cards map
        const selectedCard = source.discardCardsMap.get(discard_card_index[0]);
        if (selectedCard) {
            // Add to draw pile
            source.drawPile.unshift(selectedCard); // Use unshift to add to the top of draw pile

            // Remove from discard cards map
            source.discardCardsMap.delete(discard_card_index[0]);
        }
    },
    after_battle_effect: function (source: Player, target: Player): void {
        throw new Error('Function not implemented.');
    },
    before_battle_effect: function (source: Player, target: Player): void {
        throw new Error('Function not implemented.');
    },
    after_turn_effect: function (source: Player, target: Player): void {
        throw new Error('Function not implemented.');
    },
    before_turn_effect: function (source: Player, target: Player): void {
        throw new Error('Function not implemented.');
    }
}
export class CardFactory {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createCard(x: number, y: number, card: Card, onPointerUp: (id: number) => void) {
        // Create a container to hold all card elements
        const container = this.scene.add.container(x, y);

        // Add the card rectangle with border and light background
        const cardSprite = this.scene.add.rectangle(0, 0, cardOptions.cardWidth, cardOptions.cardHeight, 0xFFFFFF, 0.9);

        // Add title text with dark color
        const titleText = this.scene.add.text(0, -120, card.text[this.scene.registry.get('language')].title, {
            fontSize: '24px',
            color: '#000000',
        }).setOrigin(0.5);

        // Add content text with dark color
        const contentText = this.scene.add.text(0, -50, card.text[this.scene.registry.get('language')].content, {
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
            onPointerUp(card.id);
        });

        return card.id;
    }

} 