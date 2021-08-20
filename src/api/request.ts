import { message, Modal } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AdminConfig from 'config';
import { configure } from 'enzyme';

interface ResponseData<T> {
    code: number;

    data: T;

    msg: string;
}

// 1、指定axios请求类型
axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

// 2、指定请求地址
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '生产地址：http://xxx.com/api' : '';

// 3、添加请求拦截器
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // const token = getToken();   真实项目用真实接口做登录，获取token
        const token = 'djasjasjdlasdljdadjasdlas21212331232dsaljasd';

        // 获取用户token后，加入到请求头里，用于后面的业务接口请求做身份验证
        if (token) {
            config.headers.token = token;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// 4、添加响应拦截器，拦截登录过期或者没有权限的请求
axios.interceptors.response.use(
    (response: AxiosResponse<ResponseData<any>>) => {
        if (!response.data) {
            return Promise.resolve(response);
        }

        // 登录过期或者未登录，弹窗提示去重新登陆
        if (response.data.code === AdminConfig.LOGIN_EXPIRE) {
            Modal.confirm({
                title: '系统提示',
                content: response.data.msg,
                okText: '重新登陆',
                onOk() {
                    // store.dispatch(clearSideBarRoutes());
                    // store.dispatch(logout());
                    // 直接跳转到登录页
                    window.location.href = `${window.location.origin}/web/system/login?redirectURL=${encodeURIComponent(
                        window.location.href
                    )}`;
                },
                onCancel() {},
            });
            return Promise.reject(new Error(response.data.msg));
        }

        // 请求成功
        if (response.data.code === AdminConfig.SUCCESS_CODE) {
            // 这里要做类型断言，否则不匹配response的类型声明
            return response.data as any;
        }

        // 请求成功，状态不为200时
        message.error(response.data.msg);
        return Promise.reject(new Error(response.data.msg));
    },
    (error: AxiosError) => {
        message.error(error.message);
        return Promise.reject(error);
    }
);

// 5、封装统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
    return axios.request<T>(options);
}
