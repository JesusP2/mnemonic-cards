import { urlFor } from "sanity";
import useDeckStore from "stores/decks";
import useGameStore from "stores/GameStore";
import {Upload} from 'antd'

export default function PageOverview() {
  const currentDeck = useDeckStore(state => state.currentDeck)
  const cardsTypeInCurrentDeckCount = useDeckStore(state => state.cardsTypeInCurrentDeckCount)
  const setPlay = useGameStore(state => state.setPlay)


  function clickHandler() {
    setPlay(true)
  }
  return (
    <>
      <div className="w-full h-64 overflow-hidden relative">
        <img
          src={currentDeck?.mainImage ? urlFor(currentDeck.mainImage).url() : ''}
          className="object-cover w-full hover:scale-105 transition-transform duration-200 ease-in-out"
        />
      </div>
        <Upload>hi</Upload>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-center font-bold text-4xl mt-4">{currentDeck?.deck}</h1>
        <h2 className="font-bold text-xl">Cards</h2>
        <div className="flex">
          {Object.entries(cardsTypeInCurrentDeckCount)
            .slice(0, 4)
            .map(([k, v]) => (
              <div key={k} className="mx-2">
                <h3>{k}</h3>
                <p className="text-center">{v}</p>
              </div>
            ))}
        </div>
        <button
          onClick={clickHandler}
          className="px-2 py-1 bg-blue-700 rounded-sm cursor-pointer"
        >
          Iniciar
        </button>
      </div>
    </>
  );
}
