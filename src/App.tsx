import React, { Suspense } from 'react';
import { Button, Spin } from 'antd';
import 'antd/dist/antd.css';

import './App.less';

function App() {
    return (
        <Suspense fallback={<Spin size="large" className="layout__loading" />}>
            <Button>222</Button>
        </Suspense>
    );
}

export default App;
