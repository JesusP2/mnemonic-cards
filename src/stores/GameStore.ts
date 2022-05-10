import create from 'zustand';

export interface GameStore {
    play: boolean;
    setPlay: (play: boolean) => void;
}

const useGameStore = create<GameStore>((set) => ({
    play: false,
    setPlay: (play) => {
        set((state) => ({ play }));
    },
}));

export default useGameStore;
