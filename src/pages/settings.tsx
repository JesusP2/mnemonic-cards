import { ReactElement, useState } from 'react';
import { Button, Menu } from 'antd';
import { FileImageOutlined, PlusSquareOutlined } from '@ant-design/icons'
import Layout from 'layouts/MainLayout';
import { Selector } from 'types';
import UpdateCard from 'components/Settings/UpdateCard';
import UpdateDeck from 'components/Settings/UpdateDeck';
import CreateDeck from 'components/Settings/CreateDeck';
import CreateCard from 'components/Settings/CreateCard';
import { urlFor } from 'sanity';
import useCardStore from 'stores/CardStore';
import useDeckStore from 'stores/decks';
import useGameStore from 'stores/GameStore';

export default function SettingsPage() {
  const [items, setItems] = useState<{ key: string; icon?: any; label: string }[]>([]);

  const currentDeck = useDeckStore(state => state.currentDeck)
  const cards = useCardStore(state => state.cards)
  const currentCard = useCardStore(state => state.currentCard)
  const setCurrentCard = useCardStore(state => state.setCurrentCard)
  const displaySelector = useGameStore(state => state.displaySelector)
  const setDisplaySelector = useGameStore(state => state.setDisplaySelector)

  function DisplaySelector() {
    switch (displaySelector) {
      case Selector.updateCard:
        if (!currentCard) return;
        return <UpdateCard card={currentCard} />;
      case Selector.updateDeck:
        if (!currentDeck) return;
        return <UpdateDeck deck={currentDeck} />;
      case Selector.createDeck:
        return <CreateDeck />;
      case Selector.createCard:
        return <CreateCard />;
      default:
        return <div>none</div>;
    }
  }

  function setCardHandler(cardId: string) {
    setCurrentCard(cardId);
    setDisplaySelector(Selector.updateCard);
  }

  function createCardHandler(e: any) {
    e.stopPropagation()
    setDisplaySelector(Selector.createCard);
  }

  return (
    <div className="flex items-stretch h-full">
      <div
        className={
          'overlflow-x-hidden w-80 border-r-[1px] border-0 border-gray-300 dark:border-gray-700  dark:focus:border-blue-600 ' +
          (currentDeck ? '' : 'hidden')
        }
      >
        <div className={"flex px-4 h-12 text-xl items-center justify-between " + (displaySelector === Selector.createDeck ? 'hidden' : '')}>
          <h2 className="font-bold text-gray-200">Cards</h2>
          <Button onClick={createCardHandler} className="grid place-items-center text-white">
            <PlusSquareOutlined />
          </Button>
        </div>
        <div className={(displaySelector === Selector.createDeck ? 'hidden' : '')}>
          <Menu
            theme="dark"
            mode="inline"
            style={{backgroundColor: '#171717'}}
            defaultSelectedKeys={['decks']}
            onSelect={({key}) => setCardHandler(key)}
            items={[
              ...cards?.filter(({deck: {_ref}}) => _ref === currentDeck?._id).map((card) => ({key: card._id, icon: <ImageCard url={card.mainImage} />, label: card.title}))
            ]}
          ></Menu>
        </div>
      </div>
      <div className="flex-1 max-h-[100vh]">{DisplaySelector()}</div>
    </div>
  );
}


SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};


function ImageCard({
  url,
}: {
  url?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}) {
  if (url) {
    return <img className="w-10 h-10 rounded-sm mr-4" src={urlFor(url).url()} />;
  } else {
    return (
      <div className="w-10 h-10 text-center leading-10 mr-4">
        <FileImageOutlined style={{ fontSize: '24px' }} />
      </div>
    );
  }
}
