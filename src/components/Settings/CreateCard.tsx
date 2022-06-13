import { useState } from 'react';
import { toast } from 'react-toastify';
import Title from './InputTitle';
import UploadImage from './UploadImage';
import UpdateControlPanel from './UpdateControlPanel';
import useCardStore from 'stores/CardStore'
import useDeckStore from 'stores/decks';

export default function CreateCard() {
  const createCard = useCardStore(state => state.createCard)
  const currentDeck = useDeckStore(state => state.currentDeck)
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [hint, setHint] = useState('')
  const [answer, setAnswer] = useState('')
  const [imgUrl, setImgUrl] = useState("");

  async function updateHandler() {
    if (!currentDeck) return
    //TODO: Activate only when fields are complete.
    try {
      await createCard(currentDeck._id, title,hint, answer, file as File)
    } catch (err: unknown) {
      toast.error("Something went wrong, please try again!")
    }
    setTitle("")
    setFile(null)
    setImgUrl("")
    setHint("")
    setAnswer("")
  }
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto flex-1">
      <div className="w-[35rem] mx-auto pt-8 flex-1">
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
        <div className='mb-8 mt-4'>
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
      <UpdateControlPanel updateHandler={updateHandler} action="Create" />
    </div>
  );
}

