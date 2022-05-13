import { Card, Difficulty, ReactSetState } from 'types';
import { useState } from 'react';
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
      toast.success("Congratz, you've finished everything!")
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
      <div className="w-full flex justify-center">
        {showAnswer ? <CardBack currentCard={currentCard!} /> : <CardFront currentCard={currentCard!} />}
      </div>
      <div className="flex w-full justify-center mt-16 gap-x-2">
        {showAnswer ? (
          <>
            <button
              onClick={() => clickHandler(Difficulty.again)}
              className="w-24 text-white bg-red-800 hover:bg-red-700 flex flex-col justify-between py-2 h-16 rounded-sm"
            >
              <p>AGAIN</p>
              <p className="text-xs">1 min</p>
            </button>
            <button
              onClick={() => clickHandler(Difficulty.hard)}
              className="w-24 text-white bg-indigo-800 hover:bg-indigo-700 flex flex-col justify-between py-2 h-16 rounded-sm"
            >
              <p>HARD</p>
              <p className="text-xs">10 mins</p>
            </button>
            <button
              onClick={() => clickHandler(Difficulty.normal)}
              className="w-24 text-white bg-blue-800 hover:bg-blue-700 flex flex-col justify-between py-2 h-16 rounded-sm"
            >
              <p>NORMAL</p>
              <p className="text-xs">1 day</p>
            </button>
            <button
              onClick={() => clickHandler(Difficulty.easy)}
              className="w-24 text-white bg-emerald-800 hover:bg-emerald-700 flex flex-col justify-between py-2 h-16 rounded-sm"
            >
              <p>EASY</p>
              <p className="text-xs">1 month</p>
            </button>
          </>
        ) : (
          <button onClick={() => showAnswerHandler()} className="shadow-none rounded-sm bg-orange-700 hover:bg-orange-600 focus:bg-orange-600 border-none text-white px-4 h-10">
            Mostrar respuesta
          </button>
        )}
      </div>
    </>
  );
}
