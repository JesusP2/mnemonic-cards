import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Sider, Content } = Layout;

export default function PlayGame({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    function toggleCollapse() {
        setCollapsed((prev) => !prev);
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
                <div className="flex justify-end w-full bg-red-300" style={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 0.5rem', marginTop: '0.5rem'}}>
                    {collapsed ? (
                        <MenuUnfoldOutlined
                            className=""
                            onClick={toggleCollapse}
                            style={{ color: 'white', fontSize: '22px' }}
                        />
                    ) : (
                        <MenuFoldOutlined
                            className=""
                            onClick={toggleCollapse}
                            style={{ color: 'white', fontSize: '22px' }}
                        />
                    )}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                ></Menu>
            </Sider>

            <Layout className="site-layout">
                <Content style={{backgroundColor: 'black'}}>{children}</Content>
            </Layout>
        </Layout>
    );
}
