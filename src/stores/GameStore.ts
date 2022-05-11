import { Selector } from 'types';
import create from 'zustand';

export interface GameStore {
    play: boolean;
    displaySelector: Selector;
    setDisplaySelector: (selector: Selector) => void;
    setPlay: (play: boolean) => void;
}

const useGameStore = create<GameStore>((set) => ({
    play: false,
    displaySelector: Selector.none,
    setPlay: (play) => {
        set(() => ({ play }));
    },
    setDisplaySelector: (selector) => {
        set(() => ({ displaySelector: selector }));
    },
}));

export default useGameStore;
