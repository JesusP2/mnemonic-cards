import create from 'zustand';
import { sanityClient } from 'sanity';
import { toast } from 'react-toastify';
import type { Card, Deck } from 'types';
import { Difficulty } from 'types'

export interface CardStore {
  cards: Card[];
  fetch: () => Promise<void>;
  currentCard: Card | null;
  setCurrentCard: (cardId: string) => void;
  getNextCard: (deckId?: string) => null | Card;
  createCard: (deckId: string, name: string, description: string, image?: File) => Promise<void>;
  updateCard: ({
    cardId,
    name,
    description,
    difficulty,
    showAt,
    image,
  }: {
    cardId: string;
    showAt?: string;
    name?: string;
    description?: string;
    difficulty?: Difficulty;
    image?: File;
  }) => Promise<void>;
  deleteCard: (cardId: string) => Promise<void>;
}

const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  currentCard: null,
  setCurrentCard: (cardId: string) => {
    const card = get().cards.find(({_id}) => _id === cardId)
    set(() => ({currentCard: card}))
  },
  getNextCard: (deckId) => {
    if (!deckId) return null;
    const currentCards: Card[] = get().cards.filter((card) => card.deck._ref == deckId);
    for (let card of currentCards) {
      const diffTimestamp = Math.floor(Date.now() / 1000) - Math.floor((new Date(card.showAt) as any) / 1000);
      if (diffTimestamp > 0) {
        // set(() => ({ currentCard: card }));
        return card
      }
    }

    // set(() => ({currentCard: null}))
    return null;
  },

  fetch: async () => {
    const query = `*[_type == 'card']`;
    const cards = await sanityClient.fetch(query);
    set(() => ({ cards }));
  },

  createCard: async (deckId: string, name: string, description: string, image?: File) => {
    const doc: Omit<Card, '_createdAt' | '_id' | '_updatedAt' | '_rev'> = {
      _type: 'card',
      title: name,
      description,
      difficulty: Difficulty.again,
      showAt: new Date(Date.now() + 6000).toISOString(),
      deck: {
        _ref: deckId,
        _type: 'reference',
      },
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

    const cardCreated = (await sanityClient.create(doc)) as Card;
    set((state) => ({ cards: [...state.cards].concat([cardCreated]) }))
    toast.info("Card created")
  },

  updateCard: async ({ cardId, name, showAt, description, image, difficulty }) => {
    const doc = {} as any;
    if (name) {
      doc['title'] = name;
    }
    if (description) {
      doc['description'] = description;
    }
    if (difficulty) {
      doc['difficulty'] = difficulty;
      //TODO: DEFINE SHOWAT
      doc['showAt'] = showAt;
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

    if (Object.values(doc).length) {
      const updatedCard: Card = await sanityClient.patch(cardId).set(doc).commit();
      const updatedCards = get().cards.map((card) => {
        if (card._id === updatedCard._id) {
          return updatedCard;
        } else {
          return card;
        }
      });
      set(() => ({ cards: updatedCards }))
    } else {
      toast.error("No fields to update")
    }

  },

  deleteCard: async (cardId) => {
    await sanityClient.delete(cardId);

    const updatedCards = get().cards.map((card) => {
      if (card._id !== cardId) {
        return card;
      }
    }) as Card[];

    set(() => ({ cards: updatedCards }));
    toast.info("Card deleted succesfully!")
  },
}));

export default useCardStore;
