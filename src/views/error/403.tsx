import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function Error403() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="系统提示：您暂时没有访问该页面的权限，请联系管理员添加权限后使用！"
            extra={
                <Button type="primary">
                    <Link to="/">返回首页</Link>
                </Button>
            }
        />
    );
}
