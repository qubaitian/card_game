interface HeroDescription {
    title: string;
    content: string;
}

interface GameText {
    heroes: {
        [key: number]: HeroDescription;
    };
    ui: {
        deck: string;
        path: string;
        life: string;
    };
}

const en: GameText = {
    heroes: {
        0: {
            title: "Warrior",
            content: "A mighty fighter\nwith great strength"
        },
        1: {
            title: "Mage",
            content: "Master of arcane\nand magical arts"
        },
        2: {
            title: "Rogue",
            content: "Swift and stealthy\nassassin"
        }
    },
    ui: {
        deck: "Deck",
        path: "Path",
        life: "Life"
    }
};

const zh: GameText = {
    heroes: {
        0: {
            title: "战士",
            content: "强大的战士\n具有超凡的力量"
        },
        1: {
            title: "法师",
            content: "精通奥术\n掌握魔法技艺"
        },
        2: {
            title: "盗贼",
            content: "敏捷隐秘\n的刺客大师"
        }
    },
    ui: {
        deck: "卡组",
        path: "路径",
        life: "生命"
    }
};

export const lang = {
    en,
    zh
};

export type Language = 'en' | 'zh'; 