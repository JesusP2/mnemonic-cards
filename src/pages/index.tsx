import { ReactElement, useEffect, useState } from 'react';
import Layout from 'layouts/MainLayout';
import useDeckStore from 'stores/decks';
import useGameStore from 'stores/GameStore';
import PageIntro from 'components/PageIntro';
import DeckOverview from 'components/DeckOverview';
import DeckPlay from 'components/DeckPlay';
import useCardStore from "stores/CardStore";
import { Card } from 'types';

export default function Page() {
  const [currentCard, setCurrentCard] = useState<null | Card>(null)
  const play = useGameStore((state) => state.play);
  const currentDeck = useDeckStore(state => state.currentDeck)

  if (!currentDeck) {
    return <PageIntro />;
  } else if (!play) {
    return <DeckOverview setCurrentCard={setCurrentCard} />;
  } else if (currentCard?._id) {
    return <DeckPlay currentCard={currentCard} setCurrentCard={setCurrentCard} />
  } else {
    return <DeckOverview setCurrentCard={setCurrentCard} />;
  }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
