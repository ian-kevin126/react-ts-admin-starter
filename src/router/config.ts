import React from 'react';

export interface IRouteMeta {
    title: string;
    icon?: string;
}

export interface IRouteBase {
    // 路由路径
    path: string;

    // 路由组件
    component?: any;

    // 302 的时候重定向地址
    redirect?: string;

    // 路由信息
    meta: IRouteMeta;

    // 是否校验权   false：不校验，不存在该属性。   true：校验，子路由会继承父路由的 auth 属性
    auth?: boolean;
}

export interface IRoute extends IRouteBase {
    children?: IRoute[];
}

/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入，而菜单栏的控制是支持异步请求控制的
 */

const routes: IRoute[] = [
    {
        path: '/',
        component: React.lazy(() => import('../layout/index')),
        meta: {
            title: '系统',
        },
        redirect: '/dashborad/intro',
        children: [
            // 以下的路由改动请小心，涉及权限校验模块
            {
                path: '/error',
                meta: {
                    title: '错误页面',
                },
                redirect: '/error/404',
                children: [
                    {
                        path: '/error/404',
                        auth: false,
                        component: React.lazy(() => import('../views/error/404')),
                        meta: {
                            title: '页面不存在',
                        },
                    },
                    {
                        path: '/error/403',
                        auth: false,
                        component: React.lazy(() => import('../views/error/403')),
                        meta: {
                            title: '暂无权限',
                        },
                    },
                ],
            },
            {
                path: '/*',
                meta: {
                    title: '错误页面',
                },
                redirect: '/error/404',
            },
        ],
    },
];

export default routes;
