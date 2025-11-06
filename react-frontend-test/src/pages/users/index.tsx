import { useEffect, useRef, useState } from 'react';
import { Button, Card, Typography } from 'antd';
const { Title } = Typography;

import UserTable from './component/UserTable';
import CreateModal from './component/CreateModal';
import './index.less';

const UserManagePage = () => {
    const taskTableRef = useRef<any>(null);

    const [createModalShow, setCreateModalShow] = useState(false);

    useEffect(() => {
        taskTableRef.current?.upData();
    }, []);

    return (
        <>
            <div className="users-container">
                <Card className="users-card">
                    <div className="users-header">
                        <Title level={2} className="users-title">用户管理</Title>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => setCreateModalShow(true)}
                        >
                            新增用户
                        </Button>
                    </div>

                    <div className="users-table-container">
                        <UserTable ref={taskTableRef} />
                    </div>
                </Card>
            </div>
            <CreateModal
                isModelShow={createModalShow}
                onCancel={() => setCreateModalShow(false)}
                upData={taskTableRef.current?.upData}
            />
        </>
    );
};

export default UserManagePage;