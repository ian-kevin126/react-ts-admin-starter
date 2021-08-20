import React from 'react';
import routes, { IRoute } from './config';

/**
 * 我们将整个路由系统分为三层结构：
 *
 * - 第一层：也是最外层的路由，例如布局的 Layout，UserLayout
 * - 第二层：系统路由，主要是登录、注册等，Login  Register
 * - 第三层：业务路由：即就是 / 路由下的业务路由
 */

interface FlattedRoute {
    // 路由表
    routeList: IRoute[];

    // 是否深层转化
    deep: boolean;

    // 路由是否需要检查授权，需要注意的是：路由配置的 auth，优先级比这里的更高
    auth: boolean;
}

/**
 * 路由拍平：将路由转化为一维数组
 */
function flattenRoute({ routeList, deep, auth }: FlattedRoute): IRoute[] {
    const result: IRoute[] = [];

    // 遍历路由表
    for (let i = 0; i < routeList.length; i++) {
        const route = routeList[i];

        result.push({
            ...route,
            // 路由配置的 auth，优先级比这里的更高，只有在没有配置路由 auth 的情况下才会设置成默认的
            auth: typeof route.auth === 'undefined' ? auth : route.auth,
        });

        // 深层转化，系统路由和业务路由需要深层递归遍历路由表
        if (deep && route.children) {
            result.push(
                ...flattenRoute({
                    routeList: route.children,
                    deep,
                    auth,
                })
            );
        }
    }

    return result;
}

function getLayoutRouteList(): IRoute[] {
    // 最外层的布局路由，不需要做深层次的拍平
    const layoutRoute = { routeList: routes, deep: false, auth: false };
    return flattenRoute(layoutRoute);
}

function getSystemRouteList(): IRoute[] {
    // 过滤系统路由表
    const routeList = routes.filter((route) => route.path === '/system');
    // 系统路由需要深层遍历，由于主要是登录、注册的组件，所以不需要授权，auth 就默认是 false
    const systemRoute = { routeList: routeList, deep: true, auth: false };
    return routeList.length > 0 ? flattenRoute(systemRoute) : [];
}

function getBusinessRouteList(): IRoute[] {
    // 过滤业务路由表
    const routeList = routes.filter((route) => route.path === '/system');
    // 业务路由需要深层遍历拍平，并且需要做授权的校验
    const businessRoute = { routeList: routeList, deep: true, auth: true };
    return routeList.length > 0 ? flattenRoute(businessRoute) : [];
}

export const layoutRouteList = getLayoutRouteList();
export const systemRouteList = getSystemRouteList();
export const businessRouteList = getBusinessRouteList();
