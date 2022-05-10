import create from 'zustand';
import {sanityClient} from 'sanity'
import type {Deck} from 'types'

export interface DeckStore {
  decks: Deck[];
  fetch: () => Promise<void>;
}

const useDeckStore = create<DeckStore>((set) => ({
    decks: [],
    fetch: async () => {
        const query = `*[_type == 'deck']`;
        const decks = await sanityClient.fetch(query);
        set(() => ({
            decks,
        }));
    },
}));
export default useDeckStore;
