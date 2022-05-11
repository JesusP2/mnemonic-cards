import { Layout, Menu } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined, MenuFoldOutlined, FolderOpenOutlined, FileImageOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import useDeckStore from 'stores/decks';
import useCardStore from 'stores/CardStore';
import { urlFor } from 'sanity';
import { toast, ToastContainer } from 'react-toastify';
import useGameStore from 'stores/GameStore';
import { Selector } from 'types';
import { useRouter } from 'next/router';

const { Sider, Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState<{ key: string; icon?: any; label: string }[]>([]);
  const router = useRouter()
  const decks = useDeckStore((state) => state.decks);
  const fetchDecks = useDeckStore((state) => state.fetch);
  const setCurrentDeck = useDeckStore((state) => state.setCurrentDeck);
  const cards = useCardStore((state) => state.cards);
  const fetchCards = useCardStore((state) => state.fetch);
  const setPlay = useGameStore((state) => state.setPlay);
  const setDisplaySelector = useGameStore((state) => state.setDisplaySelector);

  useEffect(() => {
    if (router.pathname.split('/')[1] === 'settings') {
      setItems([
        {
          key: 'newDeck',
          icon: (
            <div className="w-10 h-10 text-center leading-10 mr-2">
              <PlusSquareOutlined style={{ fontSize: '20px' }} />
            </div>
          ),
          label: 'New deck',
        },
        ...decks.map(({ _id, mainImage, deck }) => ({
          key: _id,
          icon: <ImageCard url={mainImage} />,
          label: deck,
        })),
      ]);
    } else {
      setItems([
        ...decks.map(({ _id, mainImage, deck }) => ({
          key: _id,
          icon: <ImageCard url={mainImage} />,
          label: deck,
        })),
      ]);
    }
  }, [decks]);

  useEffect(() => {
    fetchDecks().catch((err) => toast.error(err.message));
    fetchCards().catch((err) => toast.error(err.message));
  }, []);

  function toggleCollapse() {
    setCollapsed((prev) => !prev);
  }

  function onSelect(key: string) {
    if (key === 'newDeck') {
      setDisplaySelector(Selector.createDeck)
      return
    }
    setDisplaySelector(Selector.updateDeck);
    setCurrentDeck(
      key,
      cards.filter(({ deck: { _ref } }) => _ref === key),
    );
    setPlay(false);
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width="15rem" className="h-screen shadow-xl">
        <div className="w-full flex justify-end px-2">
          {collapsed ? (
            <MenuUnfoldOutlined onClick={toggleCollapse} className="text-white text-xl" />
          ) : (
            <MenuFoldOutlined onClick={toggleCollapse} className="text-white text-xl" />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{overflow: 'auto', maxHeight: 'calc(100% - 28px)'}}
          defaultSelectedKeys={['decks']}
          onSelect={({ key }) => onSelect(key)}
          items={[
            {
              key: 'decks',
              icon: <FolderOpenOutlined />,
              label: 'decks',
              children: items,
            },
          ]}
        ></Menu>
      </Sider>

      <Layout className="site-layout">
        <Content className="bg-neutral-900">
          <ToastContainer />
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

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
