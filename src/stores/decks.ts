import create from 'zustand';
import { sanityClient } from 'sanity';
import type { Card, Deck } from 'types';
import { toast } from 'react-toastify';

export interface DeckStore {
  decks: Deck[];
  fetch: () => Promise<void>;
  currentDeck: Deck | null;
  setCurrentDeck: (key: string, cards: Card[]) => void;
  cardsTypeInCurrentDeckCount: { easy: number; normal: number; hard: number; again: number; none: number };
  createDeck: (name: string, image?: File) => Promise<void>;
  updateDeck: ({ deckId, name, image }: { deckId: string; name?: string; image?: File }) => Promise<void>;
  deleteDeck: (deckId: string) => Promise<void>;
}

const useDeckStore = create<DeckStore>((set, get) => ({
  decks: [],
  currentDeck: null,
  cardsTypeInCurrentDeckCount: {
    easy: 0,
    normal: 0,
    hard: 0,
    again: 0,
    none: 0,
  },
  setCurrentDeck: (key, cards) => {
    set((state) => ({ currentDeck: state.decks.filter(({ _id }) => _id === key)[0] }));
    const count = { easy: 0, normal: 0, hard: 0, again: 0, none: 0 };
    cards.forEach(({ difficulty, deck }) => {
      if (get().currentDeck?._id === deck._ref) {
        count[difficulty]++;
      }
    });
    set(() => ({ cardsTypeInCurrentDeckCount: count }));
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
    toast.success('Deck created!');
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

      const updatedDecks = get().decks.map((deck) => {
        if (deck._id === updatedDeck._id) {
          return updatedDeck;
        } else {
          return deck;
        }
      });
      set(() => ({ decks: updatedDecks }));
      if (updatedDeck._id === get().currentDeck?._id) {
        set(() => ({currentDeck: updatedDeck}))
      }
      toast.info('Deck updated correctly!');
    } else {
      toast.error('No fields to update');
    }
  },

  deleteDeck: async (deckId) => {
    const deletedDeck = await sanityClient.delete(deckId);

    const updatedDecks = get().decks.map((deck) => {
      if (deck._id !== deckId) {
        return deck;
      }
    }) as Deck[];
    set(() => ({ decks: updatedDecks }));
    if (deletedDeck._id === get().currentDeck?._id) {
      set(() => ({currentDeck: null}))
    }
    toast.info('Deck deleted succesfully!');
  },
}));
export default useDeckStore;
