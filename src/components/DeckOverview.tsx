import { urlFor } from "sanity";
import useDeckStore from "stores/decks";
import useCardStore from 'stores/CardStore'
import useGameStore from "stores/GameStore";
import {Upload} from 'antd'
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Card, ReactSetState } from "types";

export default function PageOverview({setCurrentCard}: {setCurrentCard: ReactSetState<Card | null>}) {
  const currentDeck = useDeckStore(state => state.currentDeck)
  const getNextCard = useCardStore((state) => state.getNextCard)
  const cardsTypeInCurrentDeckCount = useDeckStore(state => state.cardsTypeInCurrentDeckCount)
  const setPlay = useGameStore(state => state.setPlay)


  function clickHandler() {
    const nextCard = getNextCard(currentDeck?._id)
    setCurrentCard(nextCard)
    if (nextCard) {
      setPlay(true)
      return
    } 
    toast.success("Congratz, you&apos;ve finished everything!")
  }

  const colors = ['green-400', 'blue-400', 'neutral-20', 'red-400']
  return (
    <>
      <div className="w-full h-64 overflow-hidden relative group">
        <img
          src={currentDeck?.mainImage ? urlFor(currentDeck.mainImage).url() : ''}
          className="object-cover w-full group-hover:scale-105 transition-transform duration-200 ease-in-out"
        />
        <Upload className={`absolute z-50 top-32 ml-[45%] hidden group-hover:block`}><h3 className="text-xl text-gray-300 font-bold">Upload image</h3></Upload>

      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-center font-bold text-4xl mt-4 text-neutral-300">{currentDeck?.deck}</h1>
        <h2 className="font-bold text-xl text-neutral-300 font-mono">Cards</h2>
        <div className="flex">
          {Object.entries(cardsTypeInCurrentDeckCount)
            .slice(0, 4)
            .map(([k, v], idx) => (
              <div key={k} className="mx-2">
                <h3 className={`text-${colors[idx]} capitalize`}>{k}</h3>
                <p className={`text-center text-${colors[idx]}-500 underline `}>{v}</p>
              </div>
            ))}
        </div>
        <button
          onClick={clickHandler}
          className="px-2 py-1 bg-blue-700 rounded-sm cursor-pointer text-gray-300"
        >
          Iniciar
        </button>
      </div>
    </>
  );
}
