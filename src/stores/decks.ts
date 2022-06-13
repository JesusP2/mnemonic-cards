import create from 'zustand';
import { sanityClient } from 'sanity';
import type { Card, Deck } from 'types';
import { toast } from 'react-toastify';

export interface DeckStore {
  decks: Deck[];
  fetch: (userId: string) => Promise<void>;
  currentDeck: Deck | null;
  setCurrentDeck: (deckId: string) => void;
  cardsTypeInCurrentDeckCount: { easy: number; normal: number; hard: number; again: number; none: number };
  setCardsTypeInCurrentDeckCount: (cards: Card[]) => void;
  createDeck: (name: string, userId: string, description: string, image?: File) => Promise<string>;
  updateDeck: ({ deckId, name, description, image }: { deckId: string; name?: string; description?: string; image?: File }) => Promise<void>;
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
  setCurrentDeck: (deckId) => {
    set((state) => ({ currentDeck: state.decks.filter(({ _id }) => _id === deckId)[0] }));
  },
  setCardsTypeInCurrentDeckCount: (cards) => {
    const count = { easy: 0, normal: 0, hard: 0, again: 0, none: 0 };
    cards.forEach(({ difficulty, deck }) => {
      if (get().currentDeck?._id === deck._ref) {
        count[difficulty]++;
      }
    });
    set(() => ({ cardsTypeInCurrentDeckCount: count }));
  },
  fetch: async (userId) => {
    const query = `*[_type == 'deck' && userId == '${userId}']`;
    const decks = await sanityClient.fetch(query);
    set(() => ({
      decks,
    }));
  },
  createDeck: async (name, description, userId, image) => {
    const doc: Omit<Deck, '_createdAt' | '_id' | '_updatedAt' | '_rev'> = {
      _type: 'deck',
      title: name,
      cardNumber: 0,
      description,
      userId
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
    return deckCreated._id
  },

  updateDeck: async ({ deckId, name, description, image }) => {
    const doc = {} as any;
    if (name) {
      doc['deck'] = name;
    }
    if (description) {
      doc['description'] = description;
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
