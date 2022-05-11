import type { Deck } from 'types';
import { urlFor } from 'sanity';
import { useEffect, useState } from 'react';
import Title from './InputTitle';
import UploadImage from './UploadImage';
import UpdateControlPanel from './UpdateControlPanel';
import { toast } from 'react-toastify';
import useDeckStore from 'stores/decks';

export default function UpdateDeck({
  deck,
}: {
  deck: Deck;
}) {
  const updateDeck = useDeckStore(state => state.updateDeck)
  const [title, setTitle] = useState(deck.deck);
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(deck.mainImage ? urlFor(deck.mainImage).url() : '');

  useEffect(() => {
    setTitle(deck.deck)
    setFile(null)
    setImgUrl(deck.mainImage ? urlFor(deck.mainImage).url() : '')
  }, [deck])
  async function updateHandler() {
    //TODO: Update only fields modified.
    try {
      await updateDeck({ deckId: deck._id, image: file as File, name: title });
    } catch (err: unknown) {
      toast.error("Something went wrong, please try again")
    }
    setTitle("")
    setFile(null)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="w-[35rem] mx-auto pt-8 flex-1">
        <Title title={title} setTitle={setTitle} />
        <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} setFile={setFile} />
      </div>
      <UpdateControlPanel updateHandler={updateHandler} />
    </div>
  );
}
