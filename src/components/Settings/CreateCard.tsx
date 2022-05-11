import { useState } from 'react';
import { toast } from 'react-toastify';
import Title from './InputTitle';
import UploadImage from './UploadImage';
import Description from './InputDescription';
import UpdateControlPanel from './UpdateControlPanel';
import useCardStore from 'stores/CardStore'
import useDeckStore from 'stores/decks';

export default function CreateCard() {
    const createCard = useCardStore(state => state.createCard)
    const currentDeck = useDeckStore(state => state.currentDeck)
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    
    async function updateHandler() {
        if (!currentDeck) return
        //TODO: Activate only when fields are complete.
        try {
            await createCard(currentDeck._id, title, description, file as File)
        } catch (err: unknown) {
          toast.error("Something went wrong, please try again!")
        }
        setTitle("")
        setFile(null)
        setDescription("")
        setImgUrl("")
    }
    return (
        <div className="flex flex-col h-full">
            <div className="w-[35rem] mx-auto pt-8 flex-1">
                <Title title={title} setTitle={setTitle} />
                <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} setFile={setFile} />
                <Description description={description} setDescription={setDescription}  />
            </div>
                <UpdateControlPanel updateHandler={updateHandler} />
        </div>
    );
}

