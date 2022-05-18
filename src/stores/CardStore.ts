import create from 'zustand';
import { sanityClient } from 'sanity';
import { toast } from 'react-toastify';
import type { Card, Deck } from 'types';
import { Difficulty } from 'types'

export interface CardStore {
  cards: {[key: string]: Card[]};
  fetch: (deckId: string) => Promise<{[key: string]: Card[]}>;
  assignDeckSpace: (deckId: string) => void;
  currentCard: Card | null;
  setCurrentCard: (cardId: string, deckId: string) => void;
  getNextCard: (deckId?: string) => null | Card;
  createCard: (deckId: string, name: string, hint: string, answer: string, image?: File) => Promise<void>;
  updateCard: ({
    cardId,
    name,
    hint,
    answer,
    difficulty,
    showAt,
    image,
  }: {
    cardId: string;
    showAt?: string;
    name?: string;
    hint?: string;
    answer?: string;
    difficulty?: Difficulty;
    image?: File;
  }) => Promise<void>;
  deleteCard: (deckId: string, cardId: string) => Promise<void>;
}

const useCardStore = create<CardStore>((set, get) => ({
  cards: {},
  currentCard: null,
  setCurrentCard: (deckId, cardId) => {
    const card = get().cards[deckId].find(({_id}) => _id === cardId)
    set(() => ({currentCard: card}))
  },
  getNextCard: (deckId) => {
    if (!deckId) return null;
    const currentCards: Card[] = get().cards[deckId]
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

  fetch: async (deckId) => {
    const query = `*[_type == 'card' && deck._ref == '${deckId}']`;
    const cards: Card[] = await sanityClient.fetch(query);
    set((state) => ({ cards: {
        ...state.cards,
        [deckId]: cards
    } }));
    return {...get().cards, [deckId]: cards}
  },
  assignDeckSpace: (deckId) => {
    set((state) => ({cards: {
      ...state.cards,
      [deckId]: []
    }}))
  },
  createCard: async (deckId, name, hint, answer, image) => {
    const doc: Omit<Card, '_createdAt' | '_id' | '_updatedAt' | '_rev'> = {
      _type: 'card',
      title: name,
      hint,
      answer,
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
    set((state) => ({cards: {
      ...state.cards,
      [deckId]: [...state.cards[deckId].concat([cardCreated])]
    }}))
    // set((state) => ({ cards: [...state.cards].concat([cardCreated]) }))
    toast.info("Card created")
  },

  updateCard: async ({ cardId, name, showAt, hint, answer, image, difficulty }) => {
    const doc = {} as any;
    if (name) {
      doc['title'] = name;
    }
     if(hint) {
      doc['hint'] = hint;
    }
    if (answer) {
      doc['answer'] = answer;
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
      const updatedCards = get().cards[updatedCard.deck._ref].map((card) => {
        if (card._id === updatedCard._id) {
          return updatedCard;
        } else {
          return card;
        }
      });
      set((state) => ({cards: {
        ...state.cards,
        [updatedCard.deck._ref]: updatedCards
      }}))
      // set((state) => ({ cards: updatedCards }))
    } else {
      toast.error("No fields to update")
    }

  },

  deleteCard: async (deckId, cardId) => {
    await sanityClient.delete(cardId);

    const updatedCards = get().cards[deckId].map((card) => {
      if (card._id !== cardId) {
        return card;
      }
    }) as Card[];

    // set(() => ({ cards: updatedCards }));
    set((state) => ({ cards: {
      ...state.cards,
      [deckId]: updatedCards
    }}));
    toast.info("Card deleted succesfully!")
  },
}));

export default useCardStore;
