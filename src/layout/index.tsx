import React, { FC, Suspense } from 'react';
import { Layout, Button } from 'antd';
import SuspendFallbackLoading from './SuspendFallBackLoading';

import './index.less';

const { Sider, Content, Header } = Layout;

const LayoutPage: FC = () => {
    return (
        <Layout className="layout-page">
            <Header>
                <Button type="link">header</Button>
            </Header>
            <Layout>
                <Sider
                    className="layout-page-sider"
                    trigger={null}
                    collapsible
                    collapsed={false}
                    breakpoint="md"
                ></Sider>
                <Content className="layout-page-content">
                    {/* <TagsView /> */}
                    <Suspense
                        fallback={
                            <SuspendFallbackLoading
                                message="Alert message title"
                                description="Further details about the context of this alert."
                            />
                        }
                    ></Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
