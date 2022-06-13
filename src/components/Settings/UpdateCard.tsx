import type { Card } from 'types';
import { urlFor } from 'sanity';
import { useEffect, useState } from 'react';
import Title from './InputTitle';
import UploadImage from './UploadImage';
import UpdateControlPanel from './UpdateControlPanel';
import { toast } from 'react-toastify';
import useCardStore from 'stores/CardStore';

export default function UpdateCard({ card }: { card: Card }) {
  const updateCard = useCardStore((state) => state.updateCard);
  const deleteCard = useCardStore((state) => state.deleteCard)
  const [title, setTitle] = useState(card.title);
  const [file, setFile] = useState<File | null>(null);
  const [hint, setHint] = useState(card.hint);
  const [answer, setAnswer] = useState(card.answer);
  const [imgUrl, setImgUrl] = useState(card.mainImage ? urlFor(card.mainImage).url() : '');


  useEffect(() => {
    setTitle(card.title);
    setFile(null);
    setHint(card.hint);
    setAnswer(card.answer);
    setImgUrl(card.mainImage ? urlFor(card.mainImage).url() : '');
  }, [card]);

  async function updateHandler() {
    //TODO: Activate only when fields are modified and update only those fields.
    try {
      await updateCard({ cardId: card._id, image: file as File, name: title, hint, answer });
      toast.info('Card updated correctly!');
    } catch (err: unknown) {
      toast.error('Something went wrong, please try again');
    }
  }
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto flex-1">
        <div className="w-[35rem] mx-auto pt-8">
          <Title title={title} setTitle={setTitle} />
          <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} setFile={setFile} />
          <div>
            <label htmlFor="Hint">
              <h1 className="text-sm font-bold text-gray-200">Hint</h1>
            </label>
            <input
              type="text"
              name="Hint"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              className="text-gray-200 bg-inherit outline focus:outline-2 focus:outline-blue-600 outline-1 outline-gray-400 w-full py-1 pl-4 mt-2 dark:outline-gray-700  dark:focus:outline-blue-600"
            />
          </div>
          <div className="mb-8 mt-4">
            <label htmlFor="Answer">
              <h1 className="text-sm font-bold text-gray-200">Answer</h1>
            </label>
            <input
              type="text"
              name="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="text-gray-200 bg-inherit outline focus:outline-2 focus:outline-blue-600 outline-1 outline-gray-400 w-full py-1 pl-4 mt-2 dark:outline-gray-700  dark:focus:outline-blue-600"
            />
          </div>
        </div>
      </div>
      <UpdateControlPanel updateHandler={updateHandler} action="Update" deleteRecord={() => deleteCard(card.deck._ref, card._id)} />
    </div>
  );
}
