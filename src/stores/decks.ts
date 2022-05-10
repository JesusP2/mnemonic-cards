import create from 'zustand';
import { sanityClient } from 'sanity';
import type { Card, Deck } from 'types';

export interface DeckStore {
  decks: Deck[];
  fetch: () => Promise<void>;
  currentDeck: Deck | null;
  setCurrentDeck: (key: string, cards: Card[]) => void;
  cardsTypeInCurrentDeckCount: { easy: number; normal: number; hard: number; again: number; none: number };
}

const useDeckStore = create<DeckStore>((set, get) => ({
  decks: [],
  currentDeck: null,
  setCurrentDeck: (key, cards) => {
    set((state) => ({ currentDeck: state.decks.filter(({ _id }) => _id === key)[0] }));
    //TODO: Uncomment when CardStore is defined
    // set((state) => {
    //   const count = { easy: 0, normal: 0, hard: 0, again: 0, none: 0 };
    //   cards.forEach(({ difficulty, deck }) => {
    //     if (state.currentDeck?._id === deck._ref) {
    //       count[difficulty]++;
    //     }
    //   });
    //   return { cardsTypeInCurrentDeckCount: count };
    // });
  },
  cardsTypeInCurrentDeckCount: {
    easy: 0,
    normal: 0,
    hard: 0,
    again: 0,
    none: 0,
  },
  fetch: async () => {
    const query = `*[_type == 'deck']`;
    const decks = await sanityClient.fetch(query);
    set(() => ({
      decks,
    }));
  },
  createDeck: async (name: string, image?: File) => {
    const doc: Omit<Deck, '_createdAt' | '_id' | '_updatedAt' | '_rev'> = {
      _type: 'deck',
      deck: name,
      cardNumber: 0,
    };
    if (image) {
      const img = await sanityClient.assets.upload('image', image, { filename: image.name });
      doc['mainImage'] = {
        _type: 'image',
        asset: {
          _ref: img._id,
          _type: 'reference',
        },
      };
    }

    const deckCreated = (await sanityClient.create(doc)) as Deck;
    set((state) => ({ decks: [...state.decks].concat([deckCreated]) }));
  },

  updateDeck: async ({ deckId, name, image }: { deckId: string; name?: string; image?: File }) => {
    const doc = {} as any;
    if (name) {
      doc['deck'] = name;
    }
    if (image && image.name) {
      const img = await sanityClient.assets.upload('image', image, { filename: image.name });
      doc['mainImage'] = {
        _type: 'image',
        asset: {
          _ref: img._id,
          _type: 'reference',
        },
      };
    }

    if (name || image) {
      const updatedDeck: Deck = await sanityClient.patch(deckId).set(doc).commit();
      set((state) => {
        let idx = -1;
        state.decks.filter((deck: Deck, index: number) => {
          if (deck._id === updatedDeck._id) {
            idx = index;
            return true;
          }
          return false;
        });
        const updatedDecks = [...state.decks.slice(0, idx), updatedDeck, ...state.decks.slice(idx + 1)];
        return { decks: updatedDecks };
      });
    } else {
      throw new Error('No fields to update');
    }
  },
}));
export default useDeckStore;
