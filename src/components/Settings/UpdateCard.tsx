import type { Card } from 'types';
import { urlFor } from 'sanity';
import { useEffect, useState } from 'react';
import Title from './InputTitle';
import UploadImage from './UploadImage';
import Description from './InputDescription';
import UpdateControlPanel from './UpdateControlPanel';
import { toast } from 'react-toastify';
import useCardStore from 'stores/CardStore';

export default function UpdateCard({ card }: { card: Card }) {
  const updateCard = useCardStore(state => state.updateCard)
  const [title, setTitle] = useState(card.title);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState(card.description);
  const [imgUrl, setImgUrl] = useState(card.mainImage ? urlFor(card.mainImage).url() : '');

  useEffect(() => {
    setTitle(card.title);
    setFile(null);
    setDescription(card.description);
    setImgUrl(card.mainImage ? urlFor(card.mainImage).url() : '');
  }, [card]);

  async function updateHandler() {
    //TODO: Activate only when fields are modified and update only those fields.
    try {
      await updateCard({ cardId: card._id, image: file as File, name: title, description });
      toast.info("Card updated correctly!")
    } catch (err: unknown) {
      toast.error("Something went wrong, please try again")
    }
    setTitle('');
    setFile(null);
    setDescription('');
  }
  return (
    <div className="flex flex-col h-full">
      <div className="w-[35rem] mx-auto pt-8 flex-1">
        <Title title={title} setTitle={setTitle} />
        <UploadImage imgUrl={imgUrl} setImgUrl={setImgUrl} setFile={setFile} />
        <Description description={description} setDescription={setDescription} />
      </div>
      <UpdateControlPanel updateHandler={updateHandler} />
    </div>
  );
}
