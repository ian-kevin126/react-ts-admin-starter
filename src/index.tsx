import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
    document.querySelector('#root')
);
