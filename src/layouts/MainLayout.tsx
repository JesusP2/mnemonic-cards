import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, FolderOpenOutlined, FileImageOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import useDeckStore from 'stores/decks';
import { urlFor } from 'sanity';
import { ToastContainer } from 'react-toastify';

const { Sider, Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const decks = useDeckStore((state) => state.decks);
  const fetchDecks = useDeckStore((state) => state.fetch);

  useEffect(() => {
    fetchDecks().catch((err) => console.log(err));
  }, []);

  function toggleCollapse() {
    setCollapsed((prev) => !prev);
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width="15rem" className="h-screen">
        <div
          className="w-full flex justify-end px-2"
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={toggleCollapse}
              className="text-white text-xl"
            />
          ) : (
            <MenuFoldOutlined
              onClick={toggleCollapse}
              className="text-white text-xl"
            />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['decks']}
          //TODO: Pass cards
          onSelect={({ key }) => setCurrentDeck(key)}
          items={[
            {
              key: 'decks',
              icon: <FolderOpenOutlined />,
              label: 'decks',
              children: decks.map(({ _id, mainImage, deck }) => ({
                key: _id,
                icon: <ImageCard url={mainImage} />,
                label: deck,
              })),
            },
          ]}
        ></Menu>
      </Sider>

      <Layout className="site-layout">
        <Content className="bg-neutral-900">
          <ToastContainer />
          {children}</Content>
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
    return (
      <img
        className="w-10 h-10 rounded-sm mr-4"
        src={urlFor(url).url()}
      />
    );
  } else {
    return (
      <div className="w-10 h-10 text-center leading-10 mr-4">
        <FileImageOutlined style={{ fontSize: "24px" }} />
      </div>
    )
  }
}
