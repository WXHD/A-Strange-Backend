import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Typography } from 'antd';
const { Title } = Typography;

import UserTable from './component/UserTable';
import './index.less';

const UserManagePage = () => {
    const navigate = useNavigate();
    const taskTableRef = useRef<any>(null);

    useEffect(() => {
        taskTableRef.current?.upData();
    }, []);

    return (
        <div className="users-container">
            <Card className="users-card">
                <div className="users-header">
                    <Title level={2} className="users-title">用户管理</Title>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate({ to: '/register' })}
                    >
                        新增用户
                    </Button>
                </div>

                <div className="users-table-container">
                    <UserTable ref={taskTableRef} />
                </div>
            </Card>
        </div>
    );
};

export default UserManagePage;