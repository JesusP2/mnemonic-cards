export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface Deck {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: 'deck';
    _updatedAt: string;
    cardNumber: number;
    deck: string;
    mainImage?: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };
}

export interface Card {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: 'card';
    _updatedAt: string;
    title: string;
    deck: {
        _ref: string;
        _type: string;
    };
    description: string;
    difficulty: Difficulty;
    showAt: string;
    mainImage?: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };
}
    
export enum Difficulty {
    none = 'none',
    easy = 'easy',
    normal = 'normal',
    hard = 'hard',
    again = 'again',
}
