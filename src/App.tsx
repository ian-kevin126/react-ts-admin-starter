import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminConfig from './config';
import { IRoute } from './router/config';
import { layoutRouteList } from './router/utils';

import './App.less';
import 'antd/dist/antd.css';

function App() {
    console.log('layoutRouteList', layoutRouteList);
    return (
        <Suspense fallback={<Spin size="large" className="layout__loading" />}>
            <Router basename={AdminConfig.BASENAME}>
                <Switch>
                    {layoutRouteList.map((route: IRoute) => (
                        <Route key={AdminConfig.BASENAME + route.path} path={route.path} component={route.component} />
                    ))}
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App;
