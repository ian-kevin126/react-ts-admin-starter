export interface Config {
    LOGIN_EXPIRE: number;

    SUCCESS_CODE: number;
}

const AdminConfig: Config = {
    // 登录过期或者未登录
    LOGIN_EXPIRE: 400,

    // 请求成功状态码
    SUCCESS_CODE: 200,
};

export default AdminConfig;
