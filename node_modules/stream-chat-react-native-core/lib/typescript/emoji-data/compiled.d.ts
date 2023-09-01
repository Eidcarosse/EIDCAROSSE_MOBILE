export declare type EmojiArrayItem = {
    name: string;
    names: string[];
};
export declare type EmojiArray = EmojiArrayItem[];
export declare type Emoji = {
    name: string;
    names: string[];
    sort_order: number;
    unicode: string;
    skin_variations?: string[];
};
export declare type EmojiLib = {
    [key: string]: Emoji;
};
export declare type CompiledEmojis = {
    emojiArray: EmojiArray;
    emojiLib: EmojiLib;
};
export declare const compiledEmojis: CompiledEmojis;
