import { useState } from 'react';
import { toast } from 'react-toastify';
import Title from './InputTitle';
import UploadImage from './UploadImage';
import UpdateControlPanel from './UpdateControlPanel';
import useDeckStore from 'stores/decks';

export default function CreateDeck() {
  const createDeck = useDeckStore(state => state.createDeck)
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  async function updateHandler() {
    //TODO: Activate only when fields are complete.
    try {
      await createDeck(title, file as File)
    } catch (err: unknown) {
      toast.error("Something went wrong, please try again")
    }
    setTitle("")
    setFile(null)
    setImgUrl("")
  }
  return (
    <div className="flex flex-col h-full">
      <div className="w-[35rem] mx-auto py-8 flex-1">
        <Title title={title} setTitle={setTitle} />
        <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} setFile={setFile} />
      </div>
      <UpdateControlPanel updateHandler={updateHandler} />
    </div>
  );
}
