import { useState } from 'react';
import { toast } from 'react-toastify';
import Title from './InputTitle';
import UploadImage from './UploadImage';
import Description from './InputDescription';
import UpdateControlPanel from './UpdateControlPanel';
import useDeckStore from 'stores/decks';
import useAuthStore from 'stores/AuthStore';
import useCardStore from 'stores/CardStore'

export default function CreateDeck() {
  const createDeck = useDeckStore(state => state.createDeck)
  const assignDeckSpace = useCardStore(state => state.assignDeckSpace)
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("")
  const [imgUrl, setImgUrl] = useState("");
  const getUser = useAuthStore(state => state.getUser)
  async function updateHandler() {
    //TODO: Activate only when fields are complete.
    try {
      const {user, error} = await getUser()
      if (!user) {
        throw error
      }
      const deckId = await createDeck(title, description, user?.id, file as File)
      assignDeckSpace(deckId)
      setTitle("")
      setDescription("")
      setFile(null)
      setImgUrl("")
    } catch (err: unknown) {
      console.log(err)
      toast.error("Something went wrong, please try again")
    }
  }
  return (
    <div className="flex flex-col h-full">
      <div className="w-[35rem] mx-auto py-8 flex-1">
        <Title title={title} setTitle={setTitle} />
        <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} setFile={setFile} />
        <Description description={description} setDescription={setDescription} />
      </div>
      <UpdateControlPanel updateHandler={updateHandler} action='Create' />
    </div>
  );
}
