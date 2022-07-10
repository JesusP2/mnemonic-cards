import { Layout, Menu } from 'antd';
import { HomeOutlined, PlusSquareOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined, MenuFoldOutlined, FolderOpenOutlined, FileImageOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import useDeckStore from 'stores/decks';
import useCardStore from 'stores/CardStore';
import { urlFor } from 'sanity';
import { toast, ToastContainer } from 'react-toastify';
import useGameStore from 'stores/GameStore';
import { Selector } from 'types';
import { useRouter } from 'next/router';
import useAuthStore from 'stores/AuthStore';
import CustomInput from 'components/CustomInput'

const { Sider, Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [items, setItems] = useState<{ key: string; icon?: any; label: string }[]>([]);
    const router = useRouter()
    const decks = useDeckStore((state) => state.decks);
    const fetchDecks = useDeckStore((state) => state.fetch);
    const currentDeck = useDeckStore((state) => state.currentDeck)
    const setCurrentDeck = useDeckStore((state) => state.setCurrentDeck);
    const setCardsTypeInCurrentDeckCount = useDeckStore((state) => state.setCardsTypeInCurrentDeckCount)
    const cards = useCardStore((state) => state.cards);
    const fetchCards = useCardStore((state) => state.fetch);
    const setPlay = useGameStore((state) => state.setPlay);
    const setDisplaySelector = useGameStore((state) => state.setDisplaySelector);
    const getUser = useAuthStore(state => state.getUser)
    const signOut = useAuthStore(state => state.signOut)

    const [isHome, setIsHome] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                await getUser()
            } catch (err: unknown) {
                router.push('/auth/signin')
            }
        })()
    }, [])

    useEffect(() => {
        setIsHome(router.pathname.split('/')[1] !== 'settings')
    }, [router.pathname])

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
                ...decks.map(({ _id, mainImage, title }) => ({
                    key: _id,
                    icon: <ImageCard url={mainImage} />,
                    label: title,
                })),
            ]);
            return;
        }
        setItems([
            ...decks.map(({ _id, mainImage, title }) => ({
                key: _id,
                icon: <ImageCard url={mainImage} />,
                label: title,
            })),
        ]);
    }, [decks, router.pathname]);

    useEffect(() => {
        getUser().then(({ user, error }) => {
            if (user) {
                fetchDecks(user.id).catch((err) => toast.error(err.message));
            } else {
                toast.error("Something when wrong, please try again")
            }
        }).catch((err) => {
            console.error(err)
            toast.error("Something when wrong, please try again")
        })
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
        setCurrentDeck(key);
        setPlay(false);
        if (!(key in cards)) {
            fetchCards(key).then((cards) => {
                setCardsTypeInCurrentDeckCount(cards[key])
            }).catch((err) => toast.error(err.message))
            return
        }
        setCardsTypeInCurrentDeckCount(cards[key])
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} width="15rem" className="h-screen shadow-xl flex flex-col justify-end">
                <div className="w-full flex justify-end px-2">
                    {collapsed ? (
                        <MenuUnfoldOutlined onClick={toggleCollapse} style={{ color: 'white', fontSize: '1.25rem', lineHeight: '1.75rem' }} />
                    ) : (
                        <MenuFoldOutlined onClick={toggleCollapse} style={{ color: 'white', fontSize: '1.25rem', lineHeight: '1.75rem' }} />
                    )}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ overflow: 'auto', maxHeight: 'calc(100% - 128px)' }}
                    defaultSelectedKeys={['decks']}
                    onClick={({ key }) => onSelect(key)}
                    items={[
                        {
                            key: isHome ? 'settings' : 'home',
                            icon: isHome ? <SettingOutlined /> : <HomeOutlined />,
                            label: isHome ? 'settings' : 'home',
                            onClick: () => isHome ? router.push('/settings') : router.push('/'),
                        },
                        {
                            key: 'decks',
                            icon: <FolderOpenOutlined />,
                            label: 'decks',
                            children: items,
                        },
                    ]}
                ></Menu>
                <button onClick={() => signOut()} className='text-white'>Sign out</button>
            </Sider>
            <Layout className="h-screen">
                <Content className="bg-neutral-900" style={{ color: '#F5F5F5' }}>
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
