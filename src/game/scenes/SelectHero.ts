import { Scene } from 'phaser';
import { api } from '../common';
import { lang, Language } from '../config/lang';
import { UIBar } from '../components/UIBar';

let gameOptions = {

    // card width, in pixels
    cardWidth: 334,

    // card height, in pixels
    cardHeight: 440,

    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 1
}

export class SelectHero extends Scene {
    private currentLang: Language = 'en';  // 默认语言为英语

    constructor() {
        super({ key: 'SelectHero' });
        // 从 localStorage 获取用户语言设置，如果没有则使用默认值
        this.currentLang = (localStorage.getItem('language') as Language) || 'en';
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
        // Create UI bar with language change callback
        new UIBar(this, (language: Language) => this.setLanguage(language));

        const texts = lang[this.currentLang];
        
        // Create three hero cards with titles and descriptions
        this.createCard(
            gameOptions.cardWidth * 0.5, 
            gameOptions.cardHeight * 1, 
            texts.heroes[0].title, 
            texts.heroes[0].content, 
            0
        );
        this.createCard(
            gameOptions.cardWidth * 2, 
            gameOptions.cardHeight * 1, 
            texts.heroes[1].title, 
            texts.heroes[1].content, 
            1
        );
        this.createCard(
            gameOptions.cardWidth * 3.5, 
            gameOptions.cardHeight * 1, 
            texts.heroes[2].title, 
            texts.heroes[2].content, 
            2
        );
    }

    // Helper function to create a card with text
    private createCard(x: number, y: number, title: string, content: string, index: number) {
        // Create a container to hold all card elements
        const container = this.add.container(x, y);

        // Add the card rectangle with border and light background
        const cardSprite = this.add.rectangle(0, 0, gameOptions.cardWidth, gameOptions.cardHeight, 0xFFFFFF, 0.9)
            .setScale(gameOptions.cardScale);

        // Add title text with dark color
        const titleText = this.add.text(0, -120, title, {
            fontSize: '24px',
            color: '#000000',
        }).setOrigin(0.5);

        // Add content text with dark color
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

        // Add hover effects
        container.on('pointerover', () => {
            this.tweens.add({
                targets: container,
                scaleX: 1.05,
                scaleY: 1.05,
                y: y - 10,
                duration: 200,
                ease: 'Power2'
            });
        });

        container.on('pointerout', () => {
            this.tweens.add({
                targets: container,
                scaleX: 1,
                scaleY: 1,
                y: y,
                duration: 200,
                ease: 'Power2'
            });
        });

        // Add click handler
        container.on('pointerup', () => this.onHeroSelect(index));

        return container;
    };

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

    // 添加切换语言的方法
    public setLanguage(language: Language) {
        this.currentLang = language;
        localStorage.setItem('language', language);
        // 重新创建场景以更新文本
        this.scene.restart();
    }
} 