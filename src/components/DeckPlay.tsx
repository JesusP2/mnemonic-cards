import { Card, Difficulty, ReactSetState } from 'types';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import CardFront from 'components/CardFront';
import CardBack from 'components/CardBack';
import useCardStore from 'stores/CardStore';
import useDeckStore from 'stores/decks';
import { toast } from 'react-toastify';

export default function DeckPlay({currentCard, setCurrentCard}: {currentCard: Card; setCurrentCard: ReactSetState<Card | null>}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const currentDeck = useDeckStore((state) => state.currentDeck);
  // const currentCard = useCardStore((state) => state.currentCard);
  const getNextCard = useCardStore((state) => state.getNextCard);
  const updateCard = useCardStore((state) => state.updateCard);

  async function clickHandler(difficulty: Difficulty) {
    if (difficulty === Difficulty.again) {
      await updateCard({
        cardId: currentCard!._id,
        difficulty: difficulty,
        showAt: new Date(Math.floor(Date.now() + 60 * 1000)).toISOString(),
      });
    } else if (difficulty === Difficulty.hard) {
      await updateCard({
        cardId: currentCard!._id,
        difficulty: difficulty,
        showAt: new Date(Math.floor(Date.now() + 60 * 10 * 1000)).toISOString(),
      });
    } else if (difficulty === Difficulty.normal) {
      await updateCard({
        cardId: currentCard!._id,
        difficulty: difficulty,
        showAt: new Date(Math.floor(Date.now() + 60 * 60 * 24 * 1000)).toISOString(),
      });
    } else {
      await updateCard({
        cardId: currentCard!._id,
        difficulty: difficulty,
        showAt: new Date(Math.floor(Date.now() + 60 * 60 * 24 * 31 * 1000)).toISOString(),
      });
    }
    const nextCard = getNextCard(currentDeck?._id)
    if (!nextCard) {
      toast.success("Congratz, you&apos;ve finished everything!")
    }
    setCurrentCard(nextCard)
    setShowAnswer(false)
  }

  function showAnswerHandler() {
    setShowAnswer(true);
  }

  if (!currentCard) {
    return <div className="text-white">You&apos;ve finished for today!</div>;
  }

  return (
    <>
      {showAnswer ? <CardBack currentCard={currentCard!} /> : <CardFront currentCard={currentCard!} />}
      <div className="flex w-full justify-center mt-16">
        {showAnswer ? (
          <>
            <Button
              onClick={() => clickHandler(Difficulty.again)}
              className="w-24 h-16 grid place-items-center text-red-500 border border-r-0 border-gray-400"
            >
              <p className="text-xs">1 min</p>
              <p>De nuevo</p>
            </Button>
            <Button
              onClick={() => clickHandler(Difficulty.hard)}
              className="w-24 h-16 grid place-items-center text-focus border border-r-0 border-gray-400 text-neutral-200 hover:bg-indigo-900 hover:text-white focus:bg-inherit focus:text-white"
            >
              <p className="text-xs">10 mins</p>
              <p>Dificil</p>
            </Button>
            <Button
              onClick={() => clickHandler(Difficulty.normal)}
              className="w-24 h-16 grid place-items-center text-blue-400 border border-r-0 border-gray-400"
            >
              <p className="text-xs">1 dia</p>
              <p>Normal</p>
            </Button>
            <Button
              onClick={() => clickHandler(Difficulty.easy)}
              className="w-24 h-16 grid place-items-center text-green-400 border border-gray-400"
            >
              <p className="text-xs">1 mes</p>
              <p>Facil</p>
            </Button>
          </>
        ) : (
          <Button onClick={() => showAnswerHandler()} className="p-4 shadow-none rounded-sm bg-accent">
            Mostrar respuesta
          </Button>
        )}
      </div>
    </>
  );
}
